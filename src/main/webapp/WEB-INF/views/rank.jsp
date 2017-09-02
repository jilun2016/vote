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
                    <div class="billboard">
                        <div class="time ">
                            <div class="time-title"> 活动时间倒计时 </div>
                            <div class="time-input">
                                <span class="time-box" ms-text="time.days + '天'"></span>
                                <span class="time-box" ms-text="time.hours + '时'"></span>
                                <span class="time-box" ms-text="time.minutes + '分'"></span>
                                <span class="time-box" ms-text="time.seconds + '秒'"></span>
                            </div>
                            <div class="billboard-top"> <img src="/res/page/img/billboard-top.png"> </div>
                            <div class="billboard-body">
                                <div class="tab-pane active">
                                    <ul>
                                        <li ms-for="($index,item) in list">
                                            <a href="javascript:;;" class="b-b-line">
                                                <div class="num">
                                                    <img src="/res/page/img/icon-one.png" ms-if="$index==0">
                                                    <img src="/res/page/img/icon-two.png" ms-if="$index==1">
                                                    <img src="/res/page/img/icon-three.png" ms-if="$index==2">
                                                    <span ms-if="$index >= 3" ms-text="$index + 1"></span>
                                                </div>
                                                <span class="icon-box ">  
                                                    <img ms-attr="{src: @item.headPic}"> 
                                                </span>
                                                <div class="inner">
                                                    <div class="inner-title" ms-text="item.name +' ' + item.number +'号' "></div>
                                                    <div class="inner-content" ms-text="item.declaration"></div>
                                                </div>
                                                <div class="ticket" ms-text=" item.voteCount + '票' "></div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bar-tab">
                    <ul>
                        <li>
                            <a href="home">
                                <div class="tab-icon"> <span class="iconfont icon-shouye"></span> </div>
                                <div class="tab-title"> 首页 </div>
                            </a>
                        </li>
                        <li>
                            <a href="v_award">
                                <div class="tab-icon"> <span class="iconfont icon-jiangpin"></span> </div>
                                <div class="tab-title"> 奖品 </div>
                            </a>
                        </li>
                        <li class="active">
                            <a href="javascript:;;">
                                <div class="tab-icon"> <span class="iconfont icon-tubiao-"></span> </div>
                                <div class="tab-title"> 榜单 </div>
                            </a>
                        </li>
                    </ul>
                </div>

                <%@ include file="./common/footer.jsp" %>
                    <script src="/res/page/js/rank/rank.js<%=CDN_VERSION%>"></script>

            </body>

            </html>