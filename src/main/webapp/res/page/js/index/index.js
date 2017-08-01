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
             seconds: "00"
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
         methods: {
             more: function() {
                 indexOpt.more();
             },
             rearch: function() {
                 indexOpt.rearch();
             }
         }
     });

     var indexOpt = (function() {
         var opt = {
             queryUsers: function() {
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

                     setTimeout(function() {
                         var $container = $('#masonry');
                         $container.imagesLoaded(function() {
                             $container.masonry({
                                 itemSelector: '.item',
                                 columnWidth: 5 //每两列之间的间隙为5像素
                             });
                         });
                         if (indexVm.pagecfg.pageNo > 1) {
                             $container.masonry('reloadItems');
                         }
                     }, 800);
                 }, function(err) {
                     console.log(err)
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
             build: function() {
                 indexVm.top.signCount = campaignDetail.signCount || 0;
                 indexVm.top.viewCount = campaignDetail.viewCount || 0;
                 indexVm.top.voteCount = campaignDetail.voteCount || 0;
                 indexVm.top.sponsorPic = campaignDetail.sponsorPic || '';

                 indexVm.bottom.sponsorIntro = campaignDetail.sponsorIntro || '';
                 indexVm.bottom.imageList = campaignDetail.sponsorPicUrls || [];

                 opt.timer.creat();
                 opt.queryUsers();
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