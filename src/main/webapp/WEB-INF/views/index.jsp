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

                    <style>
                        /*瀑布流开始*/
                        
                        .wall {
                            display: block;
                            position: relative;
                        }
                        
                        .wall-column {
                            display: block;
                            position: relative;
                            width: 50%;
                            float: left;
                            padding: 0 2%;
                            box-sizing: border-box;
                        }
                        
                        .article {
                            display: block;
                            margin: 0 0 8% 0;
                            padding: 5%;
                            background: white;
                            border-radius: 3px;
                            box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
                            transition: all 100;
                            overflow: hidden;
                            position: relative;
                        }
                        
                        .article:hover {
                            transform: scale(1.01);
                        }
                        
                        .article img {
                            display: block;
                            width: 100%;
                            margin: 0 0 5% 0;
                        }
                        
                        .article a {
                            color: #666;
                        }
                        
                        .article p {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 70%;
                            font-size: 1.2em;
                            line-height: 1.5;
                        }
                        
                        .article small {
                            font-size: 1em;
                            color: #ff0000;
                            line-height: 1.5;
                        }
                        
                        .article input {
                            width: 20%;
                            padding: 0.6em;
                            border-radius: 0.4em;
                            font-size: 1.1em;
                            z-index: 100;
                            background-color: #f60;
                            border: none;
                            position: absolute;
                            bottom: 3%;
                            right: 5%;
                            color: #fff;
                            box-shadow: 0 0 7px #d7d7d7;
                        }
                        /*瀑布流结束*/
                    </style>
            </head>

            <body ms-controller="vote">
                <div class="content">
                    <div class="remind-info" ms-if="campaignScroll" style="position:inherit;">
                        <marquee scrollamount="6" scrolldelay="30" direction="left" ms-text="campaignScroll"></marquee>
                    </div>
                    <div class="show-img">
                        <img ms-attr="{src:top.sponsorPic+'?x-oss-process=style/q_60'}">
                    </div>
                    <div class="show-info">
                        <ul>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-baoming"></span>已报名 </div>
                                <div class="show-info-num" ms-text="top.signCount"></div>
                            </li>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-like"></span>累计投票 </div>
                                <div class="show-info-num" ms-text="top.voteCount"></div>
                            </li>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-fangwenliang"></span>访问量 </div>
                                <div class="show-info-num" ms-text="top.viewCount"></div>
                            </li>
                        </ul>
                    </div>
                    <div class="time">
                        <div class="time-title" ms-text="time.text"></div>
                        <div class="time-input">
                            <span class="time-box" ms-text="time.days + '天'">00天</span>
                            <span class="time-box" ms-text="time.hours + '时'">00时</span>
                            <span class="time-box" ms-text="time.minutes + '分'">00分</span>
                            <span class="time-box" ms-text="time.seconds + '秒'">00秒</span>
                        </div>
                    </div>
                    <div class="search-input">
                        <form class="form-inline">
                            <div class="form-group">
                                <div class="col-xs-8" style="padding-right: 0;">
                                    <input type="text" class="form-control" placeholder="请输入编号或姓名" maxlength="8" ms-duplex="queryKey">
                                </div>
                                <div class="col-xs-4">
                                    <button type="button" class="btn btn-default btn-block" ms-click="methods.rearch()">搜索</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="wrapper">
                        <ul class="wall">
                            <li class="article" ms-for="item in userList" data-for-rendered="methods.rendered()">
                                <a href="javascript:;;">
                                    <img ms-attr="{src: @item.headPic+'?x-oss-process=style/q_60' }" ms-if="isLoadImg" />
                                    <p ms-text="item.name"></p>
                                    <small ms-text="item.voteCount + '票'"></small>
                                    <a class="btn btn-block btn-red" ms-attr="{href:'v_user/'+ @item.userId}">给TA投票</a>
                                </a>
                            </li>
                        </ul>
                        <!-- <div id="masonry" style="display:none;">
                            <div class="item" ms-for="item in userList" data-for-rendered="methods.rendered()">
                                <div class="item-num" ms-text="'编号：' + item.number + '号'"></div>
                                <div class="item-name">
                                    <span ms-text="item.name"></span>
                                    <div class="item-ticket-num"><span class="ticket-num" ms-text="item.voteCount"></span>票</div>
                                </div>
                                <img ms-attr="{src: @item.headPic+'?x-oss-process=style/q_60' }" ms-if="isLoadImg">
                                <div class="ticket-btn" style="width:100%;">
                                    <a class="btn btn-block btn-red" ms-attr="{href:'v_user/'+ @item.userId}">给TA投票</a>
                                </div>
                            </div>
                        </div> -->
                    </div>

                    <div class="search-input" ms-if="isShowMore && userList.length>0">
                        <button type="button" class="btn btn-default btn-block" ms-click="methods.more()">加载更多</button>
                    </div>

                    <div class="rule">
                        <div class="rule-title">
                            <span class="iconfont icon-guize"></span>活动介绍
                        </div>
                        <div class="rule-body">
                            <div ms-html="bottom.sponsorIntro"></div>

                            <img ms-attr="{src: @item.picUrl+'?x-oss-process=style/q_60'}" ms-for="($idex,item) in bottom.sponsorPicUrls">
                        </div>
                    </div>
                </div>

                <div class="bar-tab">
                    <ul>
                        <li class="active">
                            <a href="javascript:;;">
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
                        <li>
                            <a href="v_rank">
                                <div class="tab-icon"> <span class="iconfont icon-tubiao-"></span> </div>
                                <div class="tab-title"> 榜单 </div>
                            </a>
                        </li>
                    </ul>
                </div>

                <%@ include file="./common/footer.jsp" %>


                    <script src="/res/page/js/index/index.js<%=CDN_VERSION%>"></script>

            </body>

            </html>