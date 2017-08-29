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
         isover: false, //是否结束
         isMore: false, //是否加载更多
         methods: {
             send: function() {
                 userOpt.send();
             },
             more: function() {
                 userOpt.queryGifts();
             }
         }
     });
     avalon.filters.titleFilter = function(item) {
         return item.nickName + "，给TA送了" + item.giftCount + "份" + item.giftName + '！';
     };
     //未达到 10条  隐藏 加载更多
     var userOpt = (function() {
         var opt = {
             queryGifts: function() {
                 vote.loading.show();
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
                     userVm.isMore = !(list.length < userVm.pagecfg.pageSize);
                     _.forEach(list, function(item) {
                         item.voteTimeStr = moment(item.voteTime).format('YYYY-MM-DD HH:mm');
                     });
                     var tempArr = _.clone(userVm.giftList, true);
                     userVm.giftList = tempArr.concat(res.data.list);
                     vote.loading.hide();
                 }, function(err) {
                     console.log(err)
                     vote.loading.hide();
                 }, 'GET', true);
             },
             send: function() {
                 vote.loading.show();
                 vote.jqAjax('common_vote', 'userId=' + userVm.userId, function(res) {
                     message.msg('投票成功.');
                     location.reload();
                     vote.loading.hide();
                 }, function(err) {
                     console.log(err)
                     vote.loading.hide();
                 }, 'POST', false);
             },
             build: function() {
                 userVm.isover = vote.isOver();
                 userVm.userId = vote.getQueryString('userId');
                 userVm.top = userDetail;
                 opt.queryGifts();

                 var shareUrl = window.location.href;
                 vote.getWxCfg(shareUrl, function() {
                     vote.wxShareCfg({
                         title: '<' + userDetail.name + '>参加了cxxx活动，等待你的支持，快去给Ta投票吧～',
                         link: shareUrl,
                         imgUrl: userDetail.headPic
                     }, {
                         title: '投她一票',
                         desc: '<' + userDetail.name + '>参加了cxxx活动，等待你的支持，快去给Ta投票吧～',
                         link: shareUrl,
                         imgUrl: userDetail.headPic,
                     });
                 });
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