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
                                            <div class="inner-title">{{top.name}}</div>
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
                                <div class="show-info-num"> {{top.number}} </div>
                            </li>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-like"></span>票数 </div>
                                <div class="show-info-num"> {{top.voteCount}} </div>
                            </li>
                            <li>
                                <div class="show-info-title"> <span class="iconfont icon-fangwenliang"></span>热度 </div>
                                <div class="show-info-num"> {{top.viewCount}} </div>
                            </li>
                        </ul>
                    </div>
                    <div class="buy-list">
                        <ul id="ulGiftList">
                            <li class="gift-li-cls" ms-click="methods.itemClick($index)" ms-class="{active:item.giftId==giftId}" ms-for="($index,item) in giftList">
                                <div class="product-img"><img ms-attr="{src:item.giftpic}"> </div>
                                <div class="product-title">{{item.giftName}}</div>
                                <div class="product-price"><span class="cl-red">{{item.giftPoint}}</span>点 </div>
                            </li>
                        </ul>
                        <div class="product-intro">
                            <span> 单价1元，抵5票</span>
                            <div class="pull-right">数量：
                                <select ms-duplex="amount">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pay-btn" ms-click="methods.pay()">去支付</div>

                <%@ include file="./common/footer.jsp" %>
                    <script src="/res/page/js/pay/pay.js?v=00007"></script>

            </body>

            </html>