;
(function($) {
    var timer = null;
    var rankVm = avalon.define({
        $id: "rank",
        time: {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
            text: '活动时间倒计时'
        },
        list: [],
        campaignScroll: campaignScroll,
        methods: {
            jumpToUserDetail: function(index) {
                window.location.href = 'v_user/' + rankVm.list[index].userId;
            }
        }
    });
    //未达到 10条  隐藏 加载更多
    var rankOpt = (function() {
        var opt = {
            loading: {
                show: function() { document.getElementById('divLoading').style.display = ''; },
                hide: function() { document.getElementById('divLoading').style.display = 'none'; }
            },
            timer: {
                creat: function() {
                    if (!vote.isOver()) {
                        timer = window.setInterval(function() {
                            vote.endTimeLoop(rankVm)
                        }, 1000);
                    } else {

                    }
                }
            },
            getQueryString: function(param) {
                var query = window.location.search;
                var iLen = param.length;
                var iStart = query.indexOf(param);
                if (iStart == -1)
                    return "";
                iStart += iLen + 1;
                var iEnd = query.indexOf("&", iStart);
                if (iEnd == -1)
                    return query.substring(iStart);
                return query.substring(iStart, iEnd);
            },
            queryRanks: function() {
                vote.loading.show();

                vote.jqAjax('rank', "", function(res) {
                    rankVm.list = res.data || [];
                    vote.loading.hide();
                }, function(err) {
                    console.log(err)
                    vote.loading.hide();
                }, 'GET', true);
            },
            build: function() {
                if (vote.isOver()) {
                    rankVm.time.text = '活动已结束';
                    message.msg('活动已结束,期待其他投票活动');
                    rankVm.campaignScroll = '活动已结束';
                }
                opt.timer.creat();
                opt.queryRanks();

                var shareUrl = "https://" + window.location.host + '/vote/' + chainId + '/home';
                vote.getWxCfg(window.location.href, function() {
                    vote.wxShareCfg({
                        title: '<' + campaignName + '>' + '发布了投票活动，等待你的支持，快去给Ta投票吧～',
                        link: shareUrl,
                        imgUrl: sponsorPic
                    }, {
                        title: '邀您投票',
                        desc: '<' + campaignName + '>' + '发布了投票活动，等待你的支持，快去给Ta投票吧～',
                        link: shareUrl,
                        imgUrl: sponsorPic,
                    });
                });
            }
        };
        return {
            build: opt.build
        }
    })();

    rankOpt.build();
})(Zepto)