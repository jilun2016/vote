package com.jlt.vote.interceptor;

import com.jlt.vote.bis.campaign.service.ICampaignService;
import com.jlt.vote.bis.campaign.vo.CampaignDetailVo;
import com.jlt.vote.bis.wx.service.IWxService;
import com.jlt.vote.util.*;
import com.xcrm.cloud.database.db.query.Ssqb;
import com.xcrm.common.util.DateFormatUtils;
import com.xcrm.log.Logger;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UrlPathHelper;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.DateFormat;
import java.text.MessageFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * 投票拦截器
 *
 * @Author gaoyan
 * @Date: 2017/7/29
 */
public class VoteInterceptor implements HandlerInterceptor {

    private static Logger logger = Logger.getLogger(VoteInterceptor.class);

    //非微信登陆
    private String voteNowxUrl = "/vote/v_nowx";

    private String campaignFinishUrl = "/vote/v_end";

    private String[] excludeUrls = {"/auth/callback", "/pay/callback", "/v_nowx","/v_end","/v_info"};

    private String[] specialUrls = {"/pay/v_pay"};

    private String[] wxRedirectUrls = {"/{0}/home","/{0}/v_user"};

    @Autowired
    private ICampaignService campaignService;

    @Autowired
    private IWxService wxService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String agent = request.getHeader("user-agent");
        String uri = getURI(request);
        //授权回调排除
        if (exclude(uri)) {
            return true;
        }

        //判断是否微信登录,非微信登陆的话 跳转提示
        if (!agent.toLowerCase().contains("micromessenger")) {
            RequestUtils.issueRedirect(request, response, voteNowxUrl);
            return false;
        }

        Long chainId = null;
        try{
            chainId = getChainId(request,uri);
        }catch (Exception e){
            logger.error("VoteInterceptor.preHandle error.uri:"+uri,e);
            ResponseUtils.createForbiddenResponse(response, "活动不存在");
            return false;
        }

        boolean isExist = campaignService.checkCampaignExist(chainId);

        //如果活动不存在,跳转活动宣传页
        if (!isExist) {
            logger.error("VoteInterceptor.preHandle error.Campaign is not exist.uri is:{}",uri);
            ResponseUtils.createForbiddenResponse(response, "活动不存在");
            return false;
        }

        //如果活动结束,禁止访问礼物落地页
        if(special(uri)
                &&BooleanUtils.isTrue(campaignService.checkCampaignFinish(chainId))){
            RequestUtils.issueRedirect(request, response, campaignFinishUrl);
            return false;
        }

        Cookie cookieFromOpenId = CookieUtils.getCookie(request, CommonConstants.WX_OPEN_ID_COOKIE);
        //首页,用户详情页 增加跳转授权
        if(wxRedirect(chainId,uri)
                &&BooleanUtils.isNotTrue(campaignService.checkCampaignFinish(chainId))){
            if (Objects.isNull(cookieFromOpenId)) {
                String wxAuthUrl = wxService.buildWxAuthRedirect(chainId,request.getRequestURL().toString());
                response.sendRedirect(wxAuthUrl);
                return false;
            }
        }


        if ((CommonConstants.POST.equals(request.getMethod().toUpperCase()))
                && ((uri.indexOf("common_vote") > 0)
                || (uri.indexOf("/pay/prepay") > 0))) {
            if(BooleanUtils.isTrue(campaignService.checkCampaignFinish(chainId))){
                ResponseUtils.createSuccessResponse(response, "活动已结束.");
                return false;
            }

            //POST方法保护
            //如果cookie openId为空,而且是投票post请求,那么重新授权
            if (Objects.isNull(cookieFromOpenId)) {
                logger.error("VoteInterceptor.preHandle error.cookieFromOpenId is null.uri is:{}",uri);
                ResponseUtils.createUnauthorizedResponse(response, "数据不存在");
                return false;
            }
        }
        if(Objects.nonNull(cookieFromOpenId)){
            WebUtils.setOpenId(request, cookieFromOpenId.getValue());
        }
        return true;// 只有返回true才会继续向下执行，返回false取消当前请求
    }

    private Long getChainId(HttpServletRequest request,String uri) throws Exception{
        String chainIdStr = null;
        if (special(uri)) {
            chainIdStr = RequestUtils.getQueryParam(request,"chainId");
        }else{
            //判断chainId 是否存在
            chainIdStr = uri.substring(1, 11);
        }
        return Long.valueOf(chainIdStr);
    }

    /**
     * 获得第三个路径分隔符的位置
     *
     * @param request
     * @throws IllegalStateException
     */
    private static String getURI(HttpServletRequest request)
            throws IllegalStateException {
        UrlPathHelper helper = new UrlPathHelper();
        String uri = helper.getOriginatingRequestUri(request);
        String ctxPath = helper.getOriginatingContextPath(request);
        int start = 0, i = 0, count = 1;
        if (!StringUtils.isBlank(ctxPath)) {
            count++;
        }
        while (i < count && start != -1) {
            start = uri.indexOf('/', start + 1);
            i++;
        }
        if (start <= 0) {
            throw new IllegalStateException(
                    "admin access path not like '/vote/...' pattern: " + uri);
        }
        return uri.substring(start);
    }

    private boolean exclude(String uri) {
        if (excludeUrls != null) {
            for (String exc : excludeUrls) {
                if (exc.equals(uri)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean special(String uri) {
        if (specialUrls != null) {
            for (String spec : specialUrls) {
                if (spec.equals(uri)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean wxRedirect(Long chainId,String uri) {
        if (wxRedirectUrls != null) {
            for (String wxRedirectUrl : wxRedirectUrls) {
                if (uri.equals(MessageFormat.format(wxRedirectUrl,String.valueOf(chainId)))) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView mav) throws Exception {
        String uri = getURI(request);
        if ((!exclude(uri))
                && mav != null
                && mav.getModelMap() != null
                && mav.getViewName() != null
                && !mav.getViewName().startsWith("redirect:")) {
            //返回活动结束时间
            //判断chainId 是否存在
            Long chainId = null;
            try{
                chainId = getChainId(request,uri);
            }catch (Exception e){
                ResponseUtils.createForbiddenResponse(response, "活动不存在");
                return;
            }
            Map<String, Object> campaignInfoMap = campaignService.queryCampaignInfo(chainId);
            Date endTime = (Date) MapUtils.getObject(campaignInfoMap,"endTime");
            mav.addObject("campaignEndTime", endTime.getTime());
            mav.addObject("campaignScroll", MapUtils.getString(campaignInfoMap,"campaignScroll"));
            mav.addObject("campaignName", MapUtils.getString(campaignInfoMap,"campaignName"));
            mav.addObject("sponsorPic", MapUtils.getString(campaignInfoMap,"sponsorPic"));
        }
    }


    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
    }

}