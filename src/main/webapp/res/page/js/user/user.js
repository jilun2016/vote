 $(document).ready(function() {
     var userVm = avalon.define({
         $id: "user",
         top: {},
         pagecfg: {
             pageNo: 1,
             pageSize: 10
         },
         userId: userDetail.userId,
         giftList: [],
         isover: false, //是否结束
         isMore: false, //是否加载更多
         campaignScroll: campaignScroll,
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
                     userId: userDetail.userId
                 }
                 vote.jqAjax('../gifts', param, function(res) {

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
                         var st = moment(item.voteTime).format('YYYY-MM-DD HH:mm');
                         item.voteTimeStr = item.remark ? ("留言: " + item.remark + '<br/>' + st) : st;
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
                 vote.jqAjax('../common_vote', 'userId=' + userDetail.userId, function(res) {
                     opt.modal.show();
                     opt.queryUserDetail();
                     vote.loading.hide();
                 }, function(err) {
                     console.log(err)
                     vote.loading.hide();
                 }, 'POST', false);
             },
             queryUserDetail: function() {
                 vote.jqAjax('../user/' + userDetail.userId, '', function(res) {
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
                         userVm.campaignScroll = '活动已结束';
                     }
                     userVm.isover = vote.isOver();
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

                         var bullets = document.getElementById('scroll_position').getElementsByTagName('li');
                         var slider = Swipe(document.getElementById('scroll_img'), {
                             auto: 3000,
                             continuous: true,
                             callback: function(pos) {
                                 $('#scroll_position li').removeClass('on');
                                 if (bullets[pos]) {
                                     $(bullets[pos]).addClass('on');
                                 } else {
                                     $(bullets[0]).addClass('on');
                                 }
                             }
                         });
                         $(function() {
                             $('.scroll_position_bg').css({
                                 width: $('#scroll_position').width()
                             });
                         });

                     });
                     opt.queryUserDetail();
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