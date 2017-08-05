 $(document).ready(function() {
     var timer = null;
     var rankVm = avalon.define({
         $id: "rank",
         time: {
             days: "00",
             hours: "00",
             minutes: "00",
             seconds: "00"
         },
         list: []
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
                 opt.timer.creat();
                 opt.queryRanks();

                 vote.wxShareCfg({
                     title: '分享标题',
                     link: '分享链接',
                     imgUrl: 'imgUrl',
                 }, {
                     title: '分享标题',
                     desc: '分享描述',
                     link: '享链接',
                     imgUrl: '分享图标',
                 });
             }
         };
         return {
             build: opt.build
         }
     })();

     rankOpt.build();
 });