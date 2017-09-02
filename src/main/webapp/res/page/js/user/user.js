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
             },
             close: function() {
                 userOpt.modal.hide();
             }
         }
     });
     avalon.filters.titleFilter = function(item) {
         return item.nickName + "，给TA送了" + item.giftCount + "份" + item.giftName + '！';
     };
     //未达到 10条  隐藏 加载更多
     var userOpt = (function() {
         var opt = {
             modal: {
                 show: function() { document.getElementById('divResultModal').style.display = ''; },
                 hide: function() { document.getElementById('divResultModal').style.display = 'none'; }
             },
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
                     opt.modal.show();
                     opt.queryUserDetail();
                     vote.loading.hide();
                 }, function(err) {
                     console.log(err)
                     vote.loading.hide();
                 }, 'POST', false);
             },
             queryUserDetail: function() {
                 vote.jqAjax('user/' + userVm.userId, '', function(res) {
                     var data = res.data;
                     userVm.top.voteCount = data.voteCount || 0;
                     userVm.top.viewCount = data.viewCount || 0;
                     userVm.top.giftPoint = data.giftPoint || 0;
                 }, function(err) {}, 'GET', false);
             },
             build: function() {
                 var shareUrl = window.location.href;
                 var fromIndex = shareUrl.indexOf('&from');
                 if (fromIndex > 0) {
                     shareUrl = shareUrl.substr(0, fromIndex);
                     window.location.href = shareUrl;
                 } else {
                     if (vote.isOver()) {
                         message.msg('活动已结束,期待其他投票活动');
                     }
                     userVm.isover = vote.isOver();
                     userVm.userId = vote.getQueryString('userId');
                     userVm.top = userDetail;
                     opt.queryGifts();

                     vote.getWxCfg(shareUrl, function() {
                         vote.wxShareCfg({
                             title: '<' + userDetail.name + '>参加了' + campaignName + '投票活动，等待你的支持，快去给Ta投票吧～',
                             link: shareUrl,
                             imgUrl: userDetail.headPic
                         }, {
                             title: '投Ta一票',
                             desc: '<' + userDetail.name + '>参加了' + campaignName + '投票活动，等待你的支持，快去给Ta投票吧～',
                             link: shareUrl,
                             imgUrl: userDetail.headPic,
                         });

                         var slider = Swipe(document.getElementById('scroll_img'), {
                             auto: 3000,
                             continuous: true,
                             callback: function(pos) {
                                 var i = bullets.length;
                                 while (i--) {
                                     bullets[i].className = ' ';
                                 }
                                 bullets[pos].className = 'on';
                             }
                         });
                         var bullets = document.getElementById('scroll_position').getElementsByTagName('li');
                         $(function() {
                             $('.scroll_position_bg').css({
                                 width: $('#scroll_position').width()
                             });
                         });

                     });
                 }
             }
         };
         return {
             build: opt.build,
             queryGifts: opt.queryGifts,
             send: opt.send,
             modal: opt.modal,
         }
     })();

     userOpt.build();
 });