<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

    <div class="loading-bg" id="divLoading" style="display:none;">
        <div class="loading">
            <div style="text-align: center;">
                <div class="v-pulse v-pulse1" style="animation-fill-mode: both; animation-timing-function: cubic-bezier(0.2, 0.68, 0.18, 1.08); animation-iteration-count: infinite; animation-duration: 0.75s; animation-name: v-pulseStretchDelay; display: inline-block; border-radius: 100%; margin: 2px; height: 15px; width: 15px; background-color: rgb(58, 185, 130); animation-delay: 0.12s;">
                </div>
                <div class="v-pulse v-pulse2" style="animation-fill-mode: both; animation-timing-function: cubic-bezier(0.2, 0.68, 0.18, 1.08); animation-iteration-count: infinite; animation-duration: 0.75s; animation-name: v-pulseStretchDelay; display: inline-block; border-radius: 100%; margin: 2px; height: 15px; width: 15px; background-color: rgb(58, 185, 130); animation-delay: 0.24s;">
                </div>
                <div class="v-pulse v-pulse3" style="animation-fill-mode: both; animation-timing-function: cubic-bezier(0.2, 0.68, 0.18, 1.08); animation-iteration-count: infinite; animation-duration: 0.75s; animation-name: v-pulseStretchDelay; display: inline-block; border-radius: 100%; margin: 2px; height: 15px; width: 15px; background-color: rgb(58, 185, 130); animation-delay: 0.36s;">
                </div>
            </div>
        </div>
    </div>

    <!-- build:lib -->
    <script src="/res/lib/js/jquery.min.js<%=CDN_VERSION%>"></script>
    <script src="/res/lib/js/lodash.min.js<%=CDN_VERSION%>"></script>
    <script src="/res/lib/js/moment.min.js<%=CDN_VERSION%>"></script>
    <script src="/res/lib/js/masonry-docs.min.js<%=CDN_VERSION%>"></script>
    <script src="/res/lib/js/vote_helper.js<%=CDN_VERSION%>"></script>
    <script src="/res/lib/js/avalon.js<%=CDN_VERSION%>"></script>
    <script src="/res/lib/js/jweixin-1.0.0.js<%=CDN_VERSION%>"></script>
    <!-- endbuild -->

    <script>
        //可以点击浏览对应图片
        $(document).ready(function() {
            var currentUrl = window.location.href;
            vote.jqAjax('/vote/${chainId}/jssdk_config', 'currentUrl=' + currentUrl, function(json) {
                var data = json.data;
                wx.config({
                    debug: true,
                    appId: data.appId,
                    timestamp: Number(data.timestamp),
                    nonceStr: data.nonce,
                    signature: data.signature,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'previewImage',
                    ]
                });
            }, function(err) {
                console.log(err)
            }, 'GET', false);
        });
    </script>