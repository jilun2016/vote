<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
        <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
            <!DOCTYPE html>
            <html lang="zh-CN">

            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <title>购买礼物</title>
                <%@ include file="./common/header.jsp" %>
            </head>

            <body ms-controller="pay">
                <div class="content">
                    <div class="gift-list">
                        <div class="gift-list-content">
                            <ul>
                                <li>
                                    <a href="javascript:;;" class="b-b-line">
                                        <span class="icon-box"> 
                                            <img  class="user-img" ms-attr="{src:top.headPic}"> 
                                        </span>
                                        <div class="inner">
                                            <div class="inner-title" ms-text="top.name"></div>
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
                                <div class="show-info-num" ms-text="top.number"></div>
                            </li>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-like"></span>票数 </div>
                                <div class="show-info-num" ms-text="top.voteCount"></div>
                            </li>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-fangwenliang"></span>热度 </div>
                                <div class="show-info-num" ms-text="top.viewCount"></div>
                            </li>
                        </ul>
                    </div>
                    <div class="buy-list">
                        <ul>
                            <li class="gift-li-cls" ms-class="{active:item.giftId==giftId}" ms-for="($index,item) in giftList">
                                <a href="javascript:;;" ms-click="methods.itemClick($index)" style="cursor: pointer;">
                                    <div class="product-img"><img ms-attr="{src:item.giftpic}"> </div>
                                    <div class="product-title" ms-text="item.giftName"></div>
                                    <div class="product-price"><span class="cl-red" ms-text="item.giftPoint"></span>点 </div>
                                </a>
                            </li>
                        </ul>
                        <div class="product-intro">
                            <span> 单价1元，抵5票</span>
                            <div class="pull-right">数量：
                                <select ms-duplex="amount">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <a ms-if="!isover" class="pay-btn" ms-click="methods.pay()" href="javascript:;;" style="cursor:pointer;">去支付</a>
                <a ms-if="isover" class="pay-btn" href="javascript:alert('活动已结束.')" style="cursor:pointer;">去支付</a>

                <%@ include file="./common/footer.jsp" %>
                    <script src="/res/page/js/pay/pay.js<%=CDN_VERSION%>"></script>

            </body>

            </html>