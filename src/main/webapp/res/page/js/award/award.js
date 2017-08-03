 $(document).ready(function() {
     var timer = null;
     var awardVm = avalon.define({
         $id: "award",
         list: []
     });

     var giftOpt = (function() {
         var opt = {
             query: function() {
                 vote.jqAjax('award', '', function(data) {
                     awardVm.list = data;
                 }, function(err) {
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

     giftOpt.build();
 });