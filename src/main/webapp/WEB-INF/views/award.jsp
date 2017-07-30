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

            <body ms-controller="gift">

                <div class="content">
                    <div class="gift-item">
                        <div ms-for="gift in list">
                            <div class="gift-title">【{{gift.giftName}}】</div>
                            <div class="gift-content">
                                {{gift.giftName}}
                                <img ms-attr="{src: gift.giftpic}">
                            </div>
                        </div>

                        <div class="gift-content">
                            <span class="cl-red">
                              赠送一点礼物为一元钱可自动兑换3票（每个礼物对应的点数不同）。赠送礼物除增加票数外无任何其他功能，所有礼物均为用户自愿购买，购买礼物后本平台不退不换，参与投票奖品价值有限，不要恶意攀比，本平台不承担任何法律责任。<br><br>
                                    【温馨提示】<br>
                              活动期间每个微信号每天可投一票。<br>
                              比赛成绩按照票数评选，票数最多排名一，如果出现票数相同，以榜单显示排名为准。<br><br>
                                  【禁止刷票】<br>
                              我们采用了高科技手段监控投票数据，严厉杜绝任何利用网络作弊投票行为，活动过程中如果发现票数异常，本平台将对刷票者做出减票，严重者甚至取消参赛资格的处理。我们将保留作弊投票行为之截图、监控数据作为证据保留。希望大家积极举报有关恶意刷票行为。<br><br>
                                  最终解释权归本平台所有！
                            </span>
                        </div>
                    </div>
                </div>

                <%@ include file="./common/footer.jsp" %>


                    <!-- <script src="/res/page/js/award/award.js?v=0004"></script> -->

            </body>

            </html>