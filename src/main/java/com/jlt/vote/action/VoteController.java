package com.jlt.vote.action;

import com.alibaba.fastjson.JSON;
import com.jlt.vote.bis.campaign.entity.CampaignAward;
import com.jlt.vote.bis.campaign.service.ICampaignService;
import com.jlt.vote.util.RequestUtils;
import com.jlt.vote.util.ResponseUtils;
import com.jlt.vote.util.WebUtils;
import com.jlt.vote.validation.ValidateFiled;
import com.jlt.vote.validation.ValidateGroup;
import com.xcrm.log.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class VoteController {

    private static Logger logger = Logger.getLogger(VoteController.class);

    @Autowired
    private ICampaignService campaignService;

    /**
     * 首页登陆
     * @param request
     * @param response
     */
    @RequestMapping(value ="/vote/{chainId}/home",method = {RequestMethod.GET})
    public String v_home(@PathVariable Long chainId, HttpServletRequest request, HttpServletResponse response,ModelMap model){
        logger.info("VoteController.v_home,chainId:{}",chainId);
        //通过chainId 查询 发起人信息
        Map<String ,Object> campaignDetail = campaignService.queryCampaignDetail(chainId);
        campaignDetail.remove("sponsorIntro");
        campaignDetail.put("chainId",chainId);
        model.addAttribute("campaignDetail", JSON.toJSONString(campaignDetail));
        return "index";
    }

    /**
     * 查询活动详情接口
     * @param request
     * @param response
     */
    @RequestMapping(value ="/vote/{chainId}/detail",method = {RequestMethod.GET})
    public void queryCampaignInfo(@PathVariable Long chainId, HttpServletRequest request, HttpServletResponse response,ModelMap model){
        logger.info("VoteController.queryCampaignInfo,chainId:{}",chainId);
        ResponseUtils.createSuccessResponse(response,campaignService.queryCampaignDetail(chainId));
    }

    /**
     * 用户详情落地页
     * @param request
     * @param response
     */
    @ValidateGroup(fileds = { @ValidateFiled(index = 1, notNull = true, desc = "用户id")})
    @RequestMapping(value ="/vote/{chainId}/v_user",method = {RequestMethod.GET})
    public String v_user(@PathVariable Long chainId, Long userId,HttpServletRequest request, HttpServletResponse response,ModelMap model){
        logger.info("VoteController.v_user({},{})",chainId,userId);
        //通过chainId userId查询用户详情,同时用户热度+1,活动热度+2
        Map<String,Object> userDetail = campaignService.queryUserDetail(chainId,userId);
        userDetail.put("chainId",chainId);
        model.addAttribute("userDetail", JSON.toJSONString(userDetail));
        return "user";
    }

    /**
     * 活动奖品落地页
     * @param request
     * @param response
     */
    @ValidateGroup(fileds = { @ValidateFiled(index = 0, notNull = true, desc = "活动id")})
    @RequestMapping(value ="/vote/{chainId}/v_award",method = {RequestMethod.GET})
    public String v_award(@PathVariable Long chainId,HttpServletRequest request, HttpServletResponse response,ModelMap model) {
        logger.info("VoteController.v_award({})",chainId);
        List<CampaignAward> campaignAwards = campaignService.queryCampaignAward(chainId);
        Map<String, Object> awardResultMap = new HashMap<>();
        awardResultMap.put("campaignAwards", campaignAwards);
        awardResultMap.put("chainId", chainId);
        model.addAttribute("campaignDetail", JSON.toJSONString(awardResultMap));
        model.addAttribute("campaignRule", campaignService.queryCampaignRule(chainId));
        return "award";
    }

    /**
     * 查询活动奖品信息
     * @param request
     * @param response
     */
    @ValidateGroup(fileds = { @ValidateFiled(index = 0, notNull = true, desc = "活动id")})
    @RequestMapping(value ="/vote/{chainId}/award",method = {RequestMethod.GET})
    public void queryCampaignAward(@PathVariable Long chainId,HttpServletRequest request, HttpServletResponse response){
        logger.info("VoteController.queryCampaignAward({})",chainId);
        //通过chainId 查询 活动奖品信息
        ResponseUtils.createSuccessResponse(response,campaignService.queryCampaignAward(chainId));
    }

    /**
     * 查询活动礼物信息
     * @param request
     * @param response
     */
    @ValidateGroup(fileds = { @ValidateFiled(index = 0, notNull = true, desc = "活动id")})
    @RequestMapping(value ="/vote/{chainId}/gift",method = {RequestMethod.GET})
    public void queryCampaignGift(@PathVariable Long chainId,HttpServletRequest request, HttpServletResponse response){
        logger.info("VoteController.queryCampaignGift({})",chainId);
        //通过chainId 查询 活动礼物信息
        ResponseUtils.createSuccessResponse(response,campaignService.queryCampaignGiftList(chainId));
    }

    /**
     * 首页用户列表
     * @param request
     * @param response
     */
    @ValidateGroup(fileds = { @ValidateFiled(index = 0, notNull = true, desc = "活动id"),
            @ValidateFiled(index = 2, notNull = true, desc = "页码"),
            @ValidateFiled(index = 3, notNull = true, desc = "页大小")})
    @RequestMapping(value ="/vote/{chainId}/users",method = {RequestMethod.GET})
    public void getVoteUserList(@PathVariable Long chainId,String queryKey, Integer pageNo, Integer pageSize, HttpServletRequest request, HttpServletResponse response){
        logger.info("VoteController.getVoteUserList({},{},{},{})",chainId,queryKey,pageNo,pageSize);
        ResponseUtils.createSuccessResponse(response,campaignService.querySimpleUserList(chainId,queryKey, pageNo, pageSize));
    }

    /**
     * 查询用户详情
     * @param request
     * @param response
     */
    @ValidateGroup(fileds = { @ValidateFiled(index = 0, notNull = true, desc = "活动id"),
            @ValidateFiled(index = 1, notNull = true, desc = "用户id")})
    @RequestMapping(value ="/vote/{chainId}/user",method = {RequestMethod.GET})
    public void getVoteUserDetail(@PathVariable Long chainId,Long userId, HttpServletRequest request, HttpServletResponse response){
        logger.info("VoteController.getVoteUserDetail({},{})",chainId,userId);
        ResponseUtils.createSuccessResponse(response,campaignService.queryUserDetail(chainId,userId));
    }

    /**
     * 查询用户礼物列表
     * @param request
     * @param response
     */
    @ValidateGroup(fileds = { @ValidateFiled(index = 0, notNull = true, desc = "活动id"),
            @ValidateFiled(index = 1, notNull = true, desc = "用户id"),
            @ValidateFiled(index = 2, notNull = true, desc = "页码"),
            @ValidateFiled(index = 3, notNull = true, desc = "页大小")})
    @RequestMapping(value ="/vote/{chainId}/gifts",method = {RequestMethod.GET})
    public void getUserGiftList(@PathVariable Long chainId,Long userId,Integer pageNo, Integer pageSize, HttpServletRequest request, HttpServletResponse response){
        logger.info("VoteController.getUserGiftList({},{},{},{})",chainId,userId,pageNo,pageSize);
        ResponseUtils.createSuccessResponse(response,campaignService.queryUserGiftList(chainId,userId,pageNo,pageSize));
    }

    /**
     * 投票人 投票
     * @param request
     * @param response
     */
    @RequestMapping(value ="/vote/{chainId}/common_vote",method = {RequestMethod.POST})
    public void vote(@PathVariable Long chainId,Long userId,HttpServletRequest request, HttpServletResponse response){
        logger.info("VoteController.vote({},{})",chainId,userId);
        String openId = WebUtils.getOpenId(request);
        campaignService.vote(chainId,openId,userId, RequestUtils.getIpAddr(request));
        ResponseUtils.defaultSuccessResponse(response);
    }


    /**
     * 查询投票排行
     * @param chainId
     * @param request
     * @param response
     */
    @RequestMapping(value ="/vote/{chainId}/rank",method = {RequestMethod.GET})
    public void voteRank(@PathVariable Long chainId, ModelAndView mav,HttpServletRequest request, HttpServletResponse response){
        logger.info("VoteController.voteRank({})",chainId);
        ResponseUtils.createSuccessResponse(response,campaignService.getVoteRank(chainId));
    }


    /**
     * 活动奖品落地页
     * @param request
     * @param response
     */
    @ValidateGroup(fileds = { @ValidateFiled(index = 0, notNull = true, desc = "活动id")})
    @RequestMapping(value ="/vote/{chainId}/v_rank",method = {RequestMethod.GET})
    public String v_rank(@PathVariable Long chainId,HttpServletRequest request, HttpServletResponse response,ModelMap model) {
        logger.info("VoteController.v_rank({})",chainId);
        List<CampaignAward> campaignAwards = campaignService.queryCampaignAward(chainId);
        Map<String, Object> awardResultMap = new HashMap<>();
        awardResultMap.put("campaignAwards", campaignAwards);
        awardResultMap.put("chainId", chainId);
        model.addAttribute("userDetail", JSON.toJSONString(awardResultMap));
        return "rank";
    }


    @RequestMapping(value ="/redis/keys/delete",method = {RequestMethod.GET})
    public void deleteRedisKeys(String auth, HttpServletRequest request, HttpServletResponse response){
        logger.info("VoteController.deleteRedisKeys,deleteRedisKeys:{}",auth);
        if(auth.equals("YNuO1BZqdPOIWGO1loTMo21Y")){
            campaignService.deleteAllRedisKeys();
        }
        ResponseUtils.defaultSuccessResponse(response);
    }

    @RequestMapping(value = "/vote/v_end", method= RequestMethod.GET)
    public String v_end(HttpServletRequest request ,HttpServletResponse response){
        logger.info("--------------/vote/v_end({})--------------------");
        return "end";
    }


}
