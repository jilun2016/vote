 $(document).ready(function() {
     var timer = null;
     var awardVm = avalon.define({
         $id: "award",
         list: [],
         campaignRule: ''
     });

     var awardOpt = (function() {
         var opt = {
             query: function() {
                 vote.loading.show();
                 vote.jqAjax('award', '', function(res) {
                     awardVm.list = res.data;
                     vote.loading.hide();
                 }, function(err) {
                     vote.loading.hide();
                     console.log(err)
                 }, 'GET', false);
             },
             build: function() {
                 awardVm.campaignRule = $("#campaignRule").val();
                 opt.query();
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

     awardOpt.build();
 });