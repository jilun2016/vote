 $(document).ready(function() {
     var timer = null;
     var awardVm = avalon.define({
         $id: "award",
         list: []
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
                 opt.query();
             }
         };
         return {
             build: opt.build
         }
     })();

     awardOpt.build();
 });