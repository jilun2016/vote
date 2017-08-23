<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <!-- build:css -->
    <link href="/res/page/fonts/iconfont.css" rel="stylesheet">
    <link href="/res/page/css/custom.css" rel="stylesheet">
    <!-- endbuild -->


    <script>
        var campaignEndTime = Number('${campaignEndTime}');
        var userDetail = '${userDetail}';
        userDetail = userDetail && JSON.parse('${userDetail}');
        var campaignDetail = '${campaignDetail}';
        campaignDetail = campaignDetail && JSON.parse('${campaignDetail}');
        var appId = 'wx54e7794a0657d2c7';

        var openId = '${openId}';
        var chainId = '${chainId}';
    </script>

    <%
	    String 	CDN_VERSION 	=   "?cdnversion=mo-1-1-2017080302";
    %>