 $(document).ready(function() {
     var payVm = avalon.define({
         $id: "pay",
         top: {
             signCount: 0,
             viewCount: 0,
             voteCount: 0,
             sponsorPic: ''
         },
         giftList: [],
         giftId: 0,
         amount: 1,
         curIndex: -1,
         methods: {
             itemClick: function(index) {
                 try {
                     alert('index=>' + index);
                     payVm.curIndex = index;
                     var cur = payVm.giftList[index];
                     if (cur) {
                         payVm.giftId = cur.giftId;
                     }
                 } catch (error) {
                     message.msg(error.message);
                 }
             },
             pay: function() {
                 if (payVm.curIndex >= 0) {
                     var cur = payVm.giftList[payVm.curIndex];
                     if (cur) {
                         vote.loading.show();
                         var param = {
                             chainId: chainId,
                             userId: userDetail.userId,
                             giftId: cur.giftId,
                             giftCount: payVm.amount,
                             openid: openId
                         }
                         vote.jqAjax('prepay', param, function(res) {
                             if (res.status) {
                                 var item = res.data;
                                 var payResult = JSON.parse(item.payResult);
                                 var _appid = payResult.appId;
                                 var _timeStamp = payResult.timeStamp;
                                 var _nonceStr = payResult.nonceStr;
                                 var _package = payResult.package;
                                 var _signType = payResult.signType;
                                 var _paySign = payResult.paySign;

                                 WeixinJSBridge.invoke('getBrandWCPayRequest', {
                                         "appId": _appid,
                                         "timeStamp": _timeStamp,
                                         "nonceStr": _nonceStr,
                                         "package": _package,
                                         "signType": _signType,
                                         "paySign": _paySign
                                     },
                                     function(res) {
                                         vote.loading.hide();
                                         if (res.err_msg == "get_brand_wcpay_request:ok") {
                                             alert('支付成功');
                                         } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                             message.msg("交易已取消");
                                             orderId = -1;
                                         } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                                             message.msg("支付失败");
                                             orderId = -1;
                                         } else {
                                             message.msg(res.err_msg || res.errMsg);
                                             orderId = -1;
                                         }
                                     });
                             } else {
                                 message.msg(data.msg);
                                 vote.loading.hide();
                             }
                         }, function(err) {
                             vote.loading.hide();
                         }, 'POST', false);
                     }
                 } else {
                     message.msg('请选择要购买的礼物.');
                 }
             }
         }
     });

     var payOpt = (function() {
         var opt = {
             queryGiftList: function() {
                 vote.loading.show();
                 vote.jqAjax('../gift', '', function(res) {
                     if (res.status) {
                         payVm.giftList = res.data;
                     } else {
                         message.msg(res.msg);
                     }
                     vote.loading.hide();
                 }, function(err) { vote.loading.hide(); }, 'GET', false);
             },
             build: function() {
                 payVm.top = userDetail;
                 opt.queryGiftList();
             }
         };
         return {
             build: opt.build,
         }
     })();

     payOpt.build();
 });