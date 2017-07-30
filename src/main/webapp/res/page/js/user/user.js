 $(document).ready(function() {
     var userVm = avalon.define({
         $id: "user",
         top: {},
         pagecfg: {
             pageNo: 1,
             pageSize: 10
         },
         giftList: [],
         userId: 0,
         methods: {
             send: function() {
                 userOpt.send();
             },
             more: function() {
                 userOpt.queryGifts();
             }
         }
     });
     //未达到 10条  隐藏 加载更多
     var userOpt = (function() {
         var opt = {
             loading: {
                 show: function() { document.getElementById('divLoading').style.display = ''; },
                 hide: function() { document.getElementById('divLoading').style.display = 'none'; }
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
             queryGifts: function() {
                 opt.loading.show();
                 var param = {
                     pageNo: userVm.pagecfg.pageNo,
                     pageSize: userVm.pagecfg.pageSize,
                     userId: userVm.userId
                 }
                 vote.jqAjax('gifts', param, function(res) {

                     if (userVm.pagecfg.pageNo == 1) {
                         userVm.giftList.length > 0 && (userVm.giftList = []);
                     }
                     userVm.pagecfg.pageNo++;
                     if (res.data.list.length === 0) {
                         userVm.pagecfg.pageNo--;
                     }
                     var list = res.data.list;
                     _.forEach(list, function(item) {
                         item.voteTimeStr = moment(item.voteTime).format('YYYY-MM-DD HH:mm');
                     });
                     var tempArr = _.clone(userVm.giftList, true);
                     userVm.giftList = tempArr.concat(res.data.list);
                     opt.loading.hide();
                 }, function(err) {
                     console.log(err)
                     opt.loading.hide();
                 }, 'GET', true);
             },
             send: function() {
                 opt.loading.show();
                 vote.jqAjax('common_vote', 'userId=' + userVm.userId, function(res) {
                     message.msg('投票成功.');
                     opt.loading.hide();
                 }, function(err) {
                     console.log(err)
                     opt.loading.hide();
                 }, 'POST', false);
             },
             build: function() {
                 userVm.userId = opt.getQueryString('userId');
                 userVm.top = userDetail;
                 opt.queryGifts();
             }
         };
         return {
             build: opt.build,
             queryGifts: opt.queryGifts,
             send: opt.send,
         }
     })();

     userOpt.build();
 });