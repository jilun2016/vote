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

            <body ms-controller="rank">
                <div class="content">
                    <div class="time">
                        <div class="time-title"> 活动时间倒计时 </div>
                        <div class="time-input">
                            <span class="time-box"> {{time.days}}天 </span>
                            <span class="time-box"> {{time.hours}}时 </span>
                            <span class="time-box"> {{time.minutes}}分 </span>
                            <span class="time-box"> {{time.seconds}}秒 </span>
                        </div>
                    </div>
                    <div class="list-content">
                        <div class="tab-pane active">
                            <ul>
                                <li ms-for="($index,item) in list">
                                    <a href="javascript:;;" class="b-b-line">
                                        <span class="icon-box"> <img ms-attr="{src: @item.headPic}"> </span>
                                        <div class="inner">
                                            <div class="inner-title">{{item.name}} {{item.number}}号</div>
                                            <div class="inner-content">票数 {{item.voteCount}} 礼物{{item.giftPoint}}点</div>
                                        </div>
                                        <div class="num">{{$index + 1}}</div>
                                    </a>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="bar-tab">
                    <ul>
                        <li class="">
                            <a href="index.html">
                                <div class="tab-icon"> <span class="iconfont icon-shouye"></span> </div>
                                <div class="tab-title"> 首页 </div>
                            </a>
                        </li>
                        <li class="">
                            <a href="gift.html">
                                <div class="tab-icon"> <span class="iconfont icon-jiangpin"></span> </div>
                                <div class="tab-title"> 奖品 </div>
                            </a>
                        </li>
                        <li class="active">
                            <a href="list.html">
                                <div class="tab-icon"> <span class="iconfont icon-tubiao-"></span> </div>
                                <div class="tab-title"> 榜单 </div>
                            </a>
                        </li>
                    </ul>
                </div>

                <%@ include file="./common/footer.jsp" %>
                    <script src="/res/page/js/rank/rank.js?v=0004"></script>

            </body>

            </html>