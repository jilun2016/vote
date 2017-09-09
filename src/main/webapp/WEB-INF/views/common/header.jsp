<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <link rel="stylesheet" href="https://pic.jilunxing.com/vote/build-e92c87d983.min.css">


    <style>
        .loading-bg {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, .1);
            z-index: 8888;
        }
        
        .loading {
            position: fixed;
            width: 100px;
            height: 100px;
            border-radius: 5px;
            left: 50%;
            margin-left: -50px;
            top: 50%;
            margin-top: -50px;
            z-index: 9999;
        }
        
        @-webkit-keyframes v-pulseStretchDelay {
            0%,
            80% {
                -webkit-transform: scale(1);
                transform: scale(1);
                -webkit-opacity: 1;
                opacity: 1;
            }
            45% {
                -webkit-transform: scale(0.1);
                transform: scale(0.1);
                -webkit-opacity: 0.7;
                opacity: 0.7;
            }
        }
        
        @keyframes v-pulseStretchDelay {
            0%,
            80% {
                -webkit-transform: scale(1);
                transform: scale(1);
                -webkit-opacity: 1;
                opacity: 1;
            }
            45% {
                -webkit-transform: scale(0.1);
                transform: scale(0.1);
                -webkit-opacity: 0.7;
                opacity: 0.7;
            }
        }
    </style>

    <script>
        var campaignEndTime = Number('${campaignEndTime}');
        var userDetail = '${userDetail}';
        userDetail = userDetail && JSON.parse('${userDetail}');

        var campaignAwards = '${campaignAwards}';
        campaignAwards = campaignAwards && JSON.parse('${campaignAwards}');

        var appId = 'wx54e7794a0657d2c7';
        var campaignName = '${campaignName}';
        var sponsorPic = '${sponsorPic}';
        var openId = '${openId}';
        var chainId = '${chainId}';
        var campaignScroll = '${campaignScroll}';
        var jsAPISignature = '${jsAPISignature}';
        jsAPISignature = jsAPISignature && JSON.parse(jsAPISignature);
    </script>

    <%
    %>