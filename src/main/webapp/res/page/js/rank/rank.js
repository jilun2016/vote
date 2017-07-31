 $(document).ready(function() {
     var timer = null;
     var rankVm = avalon.define({
         $id: "rank",
         time: {
             days: 0,
             hours: 0,
             minutes: 0,
             seconds: 0
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
                     var isAfter = moment().isAfter(campaignEndTime);
                     if (!isAfter) {
                         timer = window.setInterval(function() {
                             opt.timer.loop();
                         }, 1000);
                     }
                 },
                 loop: function() {
                     var startTime = moment();
                     var endTime = moment(campaignEndTime);
                     var millisecond = endTime.diff(startTime);

                     var days = millisecond / 1000 / 60 / 60 / 24;
                     var daysRound = Math.floor(days);
                     var hours = millisecond / 1000 / 60 / 60 - (24 * daysRound);
                     var hoursRound = Math.floor(hours);
                     var minutes = millisecond / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
                     var minutesRound = Math.floor(minutes);
                     var seconds = millisecond / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
                     var secondsRound = Math.floor(seconds);

                     rankVm.time.days = daysRound;
                     rankVm.time.hours = hoursRound;
                     rankVm.time.minutes = minutesRound;
                     rankVm.time.seconds = secondsRound;

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
                 opt.loading.show();

                 vote.jqAjax('rank', "", function(res) {
                     rankVm.list = res.data.voteRankList;
                     opt.loading.hide();
                 }, function(err) {
                     console.log(err)
                     opt.loading.hide();
                 }, 'GET', true);
             },
             build: function() {
                 opt.timer.creat();
                 opt.queryRanks();
             }
         };
         return {
             build: opt.build
         }
     })();

     rankOpt.build();
 });