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
                            <span class="time-box" ms-text="time.days + '天'"></span>
                            <span class="time-box" ms-text="time.hours + '时'"></span>
                            <span class="time-box" ms-text="time.minutes + '分'"></span>
                            <span class="time-box" ms-text="time.seconds + '秒'"></span>
                        </div>
                    </div>
                    <div class="list-content">
                        <div class="tab-pane active">
                            <ul>
                                <li ms-for="($index,item) in list">
                                    <a href="javascript:;;" class="b-b-line">
                                        <span class="icon-box"> <img ms-attr="{src: @item.headPic}"> </span>
                                        <div class="inner">
                                            <div class="inner-title" ms-text="item.name +' ' + item.number +'号' "></div>
                                            <div class="inner-content" ms-text="'票数:' + item.voteCount "></div>
                                        </div>
                                        <div class="num" ms-text="$index +1"></div>
                                    </a>
                                </li>
                                <li ms-if="list.length==0">
                                    <div class="empty-box">
                                        <div class="empty-img"><img ms-attr="{src:'/res/page/img/no_records.png'}"></div>
                                        <div class="empty-title">
                                            榜单上还没有上榜的她(他)<br/> 找到她(他),给她投票,早日金榜题名
                                        </div>
                                    </div>
                                </li>
                            </ul>
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