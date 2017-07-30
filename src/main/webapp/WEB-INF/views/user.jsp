<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
        <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
            <!DOCTYPE html>
            <html>

            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

                <title>首页</title>

                <%@ include file="./common/header.jsp" %>

            </head>

            <body ms-controller="user">
                <script>
                    var campaignEndTime = '${campaignEndTime}';
                    var userDetail = '${userDetail}';
                    userDetail = userDetail && JSON.parse('${userDetail}');
                </script>

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
                    <div class="show-info">
                        <div class="user-info">
                            <img <img ms-attr="{src: @top.headPic}" class="img-circle" style="width:30px;">{{top.name}}
                        </div>
                        <ul>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-geren"></span>编号 </div>
                                <div class="show-info-num">{{top.number}} </div>
                            </li>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-like"></span>票数 </div>
                                <div class="show-info-num">{{top.voteCount}} </div>
                            </li>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-fangwenliang"></span>访问量 </div>
                                <div class="show-info-num">{{top.viewCount}} </div>
                            </li>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-jiangpin"></span>礼物 </div>
                                <div class="show-info-num"> {{top.giftPoint}} </div>
                            </li>
                        </ul>
                    </div>
                    <div class="show-img"> <img ms-attr="{src: @top.userPicVos[0].picUrl}"> </div>
                    <div class="gift-list">
                        <div class="gift-list-title">
                            <span class="iconfont icon-jiangpin"></span>礼物列表
                        </div>
                        <div class="gift-list-content">
                            <ul>
                                <li ms-for="item in giftList">
                                    <a href="javascript:;;" class="b-b-line"> <span class="icon-box "> 
                                        <img ms-attr="{src: @item.headImgUrl}"> </span>
                                        <div class="inner">
                                            <div class="inner-title">{{item.nickName}}，给TA送了一份{{item.giftName}}！</div>
                                            <div class="inner-content">{{item.voteTimeStr}}</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <button type="button" class="btn btn-default btn-block" ms-click="methods.more()">加载更多</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="bottom-bar">
                    <a href="javascript:history.go(-1)" class="back"><span class="iconfont icon-fanhui"></span>返回</a>
                    <div class="top-bar-title" ms-click="methods.send()">
                        <span class="btn-vote"><i class="iconfont icon-like"></i><br>投票</span>
                    </div>
                    <div class="pull-right">
                        <a ms-attr="{href: 'pay/v_pay?userId='+@userId}" class="gift"><span class="iconfont icon-jiangpin"></span>礼物</a>
                    </div>
                </div>

                <%@ include file="./common/footer.jsp" %>

                    <script src="/res/page/js/user/user.js?v=0005"></script>

            </body>

            </html>