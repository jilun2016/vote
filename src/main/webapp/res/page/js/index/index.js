 $(document).ready(function() {
     var timer = null;
     var indexVm = avalon.define({
         $id: "vote",
         top: {
             signCount: 0,
             viewCount: 0,
             voteCount: 0,
             sponsorPic: ''
         },
         time: {
             days: "00",
             hours: "00",
             minutes: "00",
             seconds: "00",
             text: '活动时间倒计时'
         },
         bottom: {
             sponsorIntro: '',
             sponsorPicUrls: []
         },
         pagecfg: {
             pageNo: 1,
             pageSize: 10
         },
         queryKey: '',
         userList: [],
         isShowMore: false,
         isLoadImg: false,
         methods: {
             more: function() {
                 indexOpt.more();
             },
             rearch: function() {
                 indexOpt.rearch();
             },
             rendered: function() {
                 setTimeout(function() {
                     $("#masonry").show();
                     var $container = $('#masonry');
                     $container.imagesLoaded(function() {
                         $container.masonry({
                             itemSelector: '.item',
                             columnWidth: 0 //每两列之间的间隙为5像素
                         });
                     });
                     if (indexVm.pagecfg.pageNo > 1) {
                         $container.masonry('reloadItems');
                     }
                     indexVm.isLoadImg = true;
                     indexVm.isShowMore = indexVm.userList.length == indexVm.pagecfg.pageSize;
                     vote.loading.hide();
                 }, 0);
             }
         }
     });

     var indexOpt = (function() {
         var opt = {
             queryUsers: function() {
                 vote.loading.show();
                 var param = {
                     pageNo: indexVm.pagecfg.pageNo,
                     pageSize: indexVm.pagecfg.pageSize
                 }
                 indexVm.queryKey && (param.queryKey = indexVm.queryKey);

                 vote.jqAjax('users', param, function(data) {
                     if (indexVm.pagecfg.pageNo == 1) {
                         indexVm.userList.length > 0 && (indexVm.userList = []);
                     }
                     indexVm.pagecfg.pageNo++;
                     if (data.data.list.length === 0) {
                         indexVm.pagecfg.pageNo--;
                     }
                     var tempArr = _.clone(indexVm.userList, true);
                     indexVm.userList = tempArr.concat(data.data.list);
                 }, function(err) {
                     console.log(err)
                     vote.loading.hide();
                 }, 'GET', true);
             },
             timer: {
                 creat: function() {
                     if (!vote.isOver()) {
                         timer = window.setInterval(function() {
                             vote.endTimeLoop(indexVm)
                         }, 1000);
                     }
                 }
             },
             queryVoteDetail: function() {
                 vote.jqAjax('detail', '', function(res) {
                     var data = res.data;
                     indexVm.top.signCount = data.signCount || 0;
                     indexVm.top.viewCount = data.viewCount || 0;
                     indexVm.top.voteCount = data.voteCount || 0;
                 }, function(err) {}, 'GET', false);
             },
             build: function() {
                 indexVm.userList = [];
                 var shareUrl = window.location.href;
                 var fromIndex = shareUrl.indexOf('?from');
                 if (fromIndex > 0) {
                     shareUrl = shareUrl.substr(0, fromIndex);
                     window.location.href = shareUrl;
                 } else {
                     if (vote.isOver()) {
                         indexVm.time.text = '活动已结束';
                         message.msg('活动已结束,期待其他投票活动');
                     }

                     indexVm.top.signCount = campaignDetail.signCount || 0;
                     indexVm.top.viewCount = campaignDetail.viewCount || 0;
                     indexVm.top.voteCount = campaignDetail.voteCount || 0;
                     indexVm.top.sponsorPic = campaignDetail.sponsorPic || '';

                     indexVm.bottom.sponsorIntro = campaignDetail.sponsorIntro || '';
                     indexVm.bottom.imageList = campaignDetail.sponsorPicUrls || [];

                     opt.timer.creat();
                     opt.queryUsers();


                     vote.getWxCfg(shareUrl, function() {
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
                     opt.queryVoteDetail();
                 }
             }
         };
         return {
             build: opt.build,
             more: function() {
                 opt.queryUsers();
             },
             rearch: function() {
                 indexVm.pagecfg.pageNo = 1;
                 opt.queryUsers();
             }
         }
     })();

     indexOpt.build();
 });