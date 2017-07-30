<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
        <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
            <!DOCTYPE html>
            <html lang="zh-CN">

            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <title>个人中心</title>
                <link rel="stylesheet" href="/res/page/fonts/iconfont.css">
                <link href="/res/page/css/custom.css" rel="stylesheet">
            </head>

            <body>
                <input type="hidden" id="inputOpenId" value="${openId}" />
                <input type="hidden" id="inputChainId" value="${chainId}" />

                <div class="loading-bg" id="divLoading" style="display:none;">
                    <div class="loading">
                        <div style="text-align: center;">
                            <div class="v-pulse v-pulse1" style="animation-fill-mode: both; animation-timing-function: cubic-bezier(0.2, 0.68, 0.18, 1.08); animation-iteration-count: infinite; animation-duration: 0.75s; animation-name: v-pulseStretchDelay; display: inline-block; border-radius: 100%; margin: 2px; height: 15px; width: 15px; background-color: rgb(58, 185, 130); animation-delay: 0.12s;">
                            </div>
                            <div class="v-pulse v-pulse2" style="animation-fill-mode: both; animation-timing-function: cubic-bezier(0.2, 0.68, 0.18, 1.08); animation-iteration-count: infinite; animation-duration: 0.75s; animation-name: v-pulseStretchDelay; display: inline-block; border-radius: 100%; margin: 2px; height: 15px; width: 15px; background-color: rgb(58, 185, 130); animation-delay: 0.24s;">
                            </div>
                            <div class="v-pulse v-pulse3" style="animation-fill-mode: both; animation-timing-function: cubic-bezier(0.2, 0.68, 0.18, 1.08); animation-iteration-count: infinite; animation-duration: 0.75s; animation-name: v-pulseStretchDelay; display: inline-block; border-radius: 100%; margin: 2px; height: 15px; width: 15px; background-color: rgb(58, 185, 130); animation-delay: 0.36s;">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content">
                    <div class="gift-list">
                        <div class="gift-list-content">
                            <ul>
                                <li>
                                    <a href="javascript:;;" class="b-b-line">
                                        <span class="icon-box"> 
                                            <img  class="user-img" id="imgHeadPic"> 
                                        </span>
                                        <div class="inner">
                                            <div class="inner-title" id="divUserName"></div>
                                            <div class="inner-content">给Ta送上一份礼物吧</div>
                                        </div>
                                        <div class=""><span class="iconfont icon-jiantou"></span> </div>
                                    </a>

                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="show-info">
                        <ul>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-geren"></span>编号 </div>
                                <div class="show-info-num" id="divUserCode"> </div>
                            </li>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-like"></span>票数 </div>
                                <div class="show-info-num" id="divVoteCount"> </div>
                            </li>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-fangwenliang"></span>热度 </div>
                                <div class="show-info-num" id="divViewCount"> </div>
                            </li>
                        </ul>
                    </div>
                    <div class="buy-list">
                        <ul id="ulGiftList">

                        </ul>
                        <div class="product-intro">
                            <span> 单价1元，抵5票</span>
                            <div class="pull-right">数量：
                                <select id="selectCnt">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pay-btn" onclick="giftModule.divPrePay()">去支付</div>

                <script src="/res/lib/js/lodash.min.js"></script>
                <script src="/res/lib/js/axios.min.js"></script>
                <script src="/res/lib/js/jquery.min.js"></script>
                <script src="/res/lib/js/axios.helper.js?v=0007"></script>
                <script src="/res/lib/js/vote_helper.js?v=00007"></script>

                <script src="/res/page/js/pay/pay.js?v=00007"></script>


            </body>

            </html>