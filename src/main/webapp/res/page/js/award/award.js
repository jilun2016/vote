 $(document).ready(function() {
     var timer = null;
     var giftVm = avalon.define({
         $id: "gift",
         list: []
     });

     var giftOpt = (function() {
         var opt = {
             query: function() {
                 vote.jqAjax('award', '', function(data) {
                     giftVm.list = data;
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