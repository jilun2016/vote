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

            <body ms-controller="award">

                <div class="content">
                    <div class="gift-item">
                        <div ms-for="gift in list">
                            <div class="gift-title">【{{gift.summary}}】</div>
                            <div class="gift-content">
                                {{gift.detail}}
                                <img ms-attr="{src: gift.awardpic}">
                            </div>
                        </div>

                        <div class="gift-content">
                            <span class="cl-red">
                               ${campaignRule}
                            </span>
                        </div>
                    </div>
                </div>

                <%@ include file="./common/footer.jsp" %>


                    <script src="/res/page/js/award/award.js?v=0004"></script>

            </body>

            </html>