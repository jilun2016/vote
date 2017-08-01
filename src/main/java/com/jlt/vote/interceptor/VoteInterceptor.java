package com.jlt.vote.interceptor;

import com.jlt.vote.bis.campaign.service.ICampaignService;
import com.jlt.vote.config.SysConfig;
import com.jlt.vote.util.*;
import com.xcrm.log.Logger;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UrlPathHelper;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    //微信授权首页
    private String voteWxAuthUrl = "/vote/{0}/index";

    private String[] excludeUrls = {"/auth/callback", "/pay/callback"};

    @Autowired
    private SysConfig sysConfig;

    @Autowired
    private ICampaignService campaignService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String agent = request.getHeader("user-agent");
        //判断是否微信登录,非微信登陆的话 跳转提示
        if ((Objects.equals(sysConfig.getProjectProfile(), SystemProfileEnum.PRODUCT.value()))
                && (!agent.toLowerCase().contains("micromessenger"))) {
            RequestUtils.issueRedirect(request, response, voteNowxUrl);
            return false;
        }
        String uri = getURI(request);
        //授权回调排除
        if (exclude(uri)) {
            return true;
        }

        //判断chainId 是否存在
        String chainIdUri = uri.substring(1, 11);
        Long chainId = null;
        try {
            chainId = Long.valueOf(chainIdUri);
        } catch (NumberFormatException ex) {
            //当前chainId错误,跳转活动宣传页
            ResponseUtils.createForbiddenResponse(response, "活动不存在");
            return false;
        }

        boolean isExist = campaignService.checkCampaignExist(chainId);

        //如果活动不存在,跳转活动宣传页
        if (!isExist) {
            ResponseUtils.createForbiddenResponse(response, "活动不存在");
            return false;
        }
        if (!Objects.equals(sysConfig.getProjectProfile(), SystemProfileEnum.PRODUCT.value())) {
            WebUtils.setOpenId(request, "oTMo21YNuO1BZqdPOIWGO1l6c5v0");
        } else {
            if ((CommonConstants.POST.equals(request.getMethod().toUpperCase()))
                    && ((uri.indexOf("common_vote") > 0)
                    || (uri.indexOf("/pay/prepay") > 0))) {
                //POST方法保护
                Cookie cookieFromOpenId = CookieUtils.getCookie(request, CommonConstants.WX_OPEN_ID_COOKIE);
                //如果cookie openId为空,而且是投票post请求,那么重新授权
                if (Objects.isNull(cookieFromOpenId)) {
                    ResponseUtils.createUnauthorizedResponse(response, "数据不存在");
                    return false;
                } else {
                    WebUtils.setOpenId(request, cookieFromOpenId.getValue());
                }
            }
        }
        return true;// 只有返回true才会继续向下执行，返回false取消当前请求
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

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView mav) throws Exception {
        if (mav != null
                && mav.getModelMap() != null
                && mav.getViewName() != null
                && !mav.getViewName().startsWith("redirect:")) {
            //返回活动结束时间
            String uri = getURI(request);
            //判断chainId 是否存在
            String chainIdUri = uri.substring(1, 11);
            Long chainId = Long.valueOf(chainIdUri);
            Map<String, Date> campaignTimeMap = campaignService.getCampaignTimeMap(chainId);
            mav.addObject("campaignEndTime", campaignTimeMap.get("endTime").getTime());
        }
    }


    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
    }

}