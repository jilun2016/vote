  var vote = (function() {
      var opt = {
          getQueryString: function(param) {
              var query = window.location.search;
              var iLen = param.length;
              var iStart = query.indexOf(param);
              if (iStart == -1)
                  return "";
              iStart += iLen + 1;
              var iEnd = query.indexOf("&", iStart);
              if (iEnd == -1)
                  return query.substring(iStart);
              return query.substring(iStart, iEnd);
          },
          loading: {
              show: function() { document.getElementById('divLoading').style.display = ''; },
              hide: function() { document.getElementById('divLoading').style.display = 'none'; }
          },
          endTimeLoop: function(indexVm) {
              var startTime = moment();
              var endTime = moment(campaignEndTime);
              var millisecond = endTime.diff(startTime);

              var days = millisecond / 1000 / 60 / 60 / 24;
              var daysRound = Math.floor(days);
              var hours = millisecond / 1000 / 60 / 60 - (24 * daysRound);
              var hoursRound = Math.floor(hours);
              var minutes = millisecond / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
              var minutesRound = Math.floor(minutes);
              var seconds = millisecond / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
              var secondsRound = Math.floor(seconds);

              indexVm.time.days = ('0' + daysRound).slice(-2);
              indexVm.time.hours = ('0' + hoursRound).slice(-2);
              indexVm.time.minutes = ('0' + minutesRound).slice(-2);
              indexVm.time.seconds = ('0' + secondsRound).slice(-2);
          },
          isOver: function() {
              return moment().isAfter(campaignEndTime);
          },
          jqAjax: function(url, data, success, error, type, flage) {
              if (!url) {
                  message.msg("ajax请求未发现请求地址.");
                  error && error();
              } else {
                  var obj = {
                      type: (type || 'POST'),
                      url: url,
                      dataType: 'json',
                      async: true,
                      timeout: 0,
                      beforeSend: function(XMLHttpRequest) {},
                      complete: function() {},
                      success: function(json) {
                          if (json.status) {
                              success && success(json);
                          } else {
                              message.msg(json.message || json.msg);
                              error && error(json);
                          }
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                          if (error) {
                              error(jqXHR);
                          }
                          try {
                              switch (jqXHR.status) {
                                  case 401:
                                      {
                                          var urls = [];
                                          urls.push('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=');
                                          urls.push(encodeURIComponent('https://wx.jilunxing.com/vote/auth/callback'));
                                          urls.push('&response_type=code&scope=snsapi_userinfo&state=' + encodeURIComponent(window.location.href) + '#wechat_redirect');
                                          window.location.href = urls.join('');
                                      }
                                      break;
                                  case 403:
                                      {
                                          //window.location.href = 活动宣传页面
                                          alert('活动宣传页面')
                                      }
                                      break;
                                  default:
                                      {
                                          var xhr = jqXHR;
                                          if (xhr && xhr.responseText) {
                                              var _json = JSON.parse(xhr.responseText);
                                              if (!_json.res) {
                                                  _json.msg && message.msg(_json.msg);
                                              } else {
                                                  message.msg(xhr.responseText);
                                              }
                                          } else {
                                              message.msg("后端错误.");
                                          }
                                      }
                                      break;

                              }
                          } catch (ex) {
                              message.msg("后端错误.");
                          }
                      }
                  };
                  if (flage) {
                      if (data) {
                          obj.data = data;
                      }
                  } else {
                      if ((typeof data) == 'object') {
                          obj.contentType = "application/json;charset=utf-8";
                          if (data) {
                              obj.data = JSON.stringify(data);
                          }
                      } else if ((typeof data) == 'string') {
                          if (data) {
                              obj.data = data;
                          }
                      }
                  }
                  $.ajax(obj);
              }
          },
          wxShareCfg: function(onMenuShareTimeline, onMenuShareAppMessage) {
              wx.onMenuShareTimeline({ //分享到朋友圈
                  title: onMenuShareTimeline.title, // 分享标题
                  link: onMenuShareTimeline.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: onMenuShareTimeline.imgUrl, // 分享图标
                  success: function() {},
                  cancel: function() {}
              });

              wx.onMenuShareAppMessage({ //分享给朋友
                  title: onMenuShareAppMessage.title, // 分享标题
                  desc: onMenuShareAppMessage.desc, // 分享描述
                  link: onMenuShareAppMessage.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: onMenuShareAppMessage.imgUrl, // 分享图标
                  success: function() {},
                  cancel: function() {}
              });
          },
          getWxCfg: function(currentUrl, callback) {
              var index = currentUrl.indexOf('#');
              currentUrl = index > 0 ? currentUrl.substr(0, index) : currentUrl;
              alert('currentUrl=' + currentUrl);
              vote.jqAjax('/vote/' + userDetail.chainId + '/jssdk_config', 'currentUrl=' + currentUrl, function(json) {
                  var data = json.data;
                  alert(JSON.stringify(data));
                  if (data) {
                      wx.config({
                          debug: true,
                          appId: data.appId,
                          timestamp: Number(data.timestamp),
                          nonceStr: data.nonce,
                          signature: data.signature,
                          jsApiList: [
                              'onMenuShareTimeline',
                              'onMenuShareAppMessage',
                              'previewImage',
                          ]
                      });
                      callback && callback();
                  }
              }, function() {}, 'GET', '');
          }
      }

      return {
          loading: opt.loading,
          getQueryString: opt.getQueryString,
          endTimeLoop: opt.endTimeLoop,
          isOver: opt.isOver,
          jqAjax: opt.jqAjax,
          wxShareCfg: opt.wxShareCfg,
          getWxCfg: opt.getWxCfg
      }
  })();

  var message = (function() {
      var timer = null;
      var id = "$messageId";
      var cssId = "$cssId";
      var styleContent = ".prompt{width:50%;position:fixed;left:25%;height:auto;background:#000;border-radius:5px;top:200px;text-align:center;color:#fff;padding:15px;box-shadow:1px 1px 5px rgba(0,0,0,.5);z-index:99999}@media(min-width:992px){.prompt{top:20px}}";
      var createStyleElement = function() {
          if (isExist(cssId)) {
              return false
          }
          var style = document.createElement("style");
          style.type = "text/css";
          style.id = cssId;
          style.innerHTML = styleContent;
          document.getElementsByTagName("HEAD").item(0).appendChild(style)
      };
      var createMsgElement = function(msg, isClose) {
          if (isExist(id)) {
              clearTimeOut()
          }
          remove();
          var div = document.createElement("div");
          div.id = id;
          div.className = "prompt";
          div.innerHTML = msg;
          document.body.appendChild(div);
          if (!isClose) {
              autoClose()
          }
      };
      var isExist = function(_id) {
          return document.getElementById(_id) ? true : false
      };
      var remove = function() {
          var node = document.getElementById(id);
          if (node) document.body.removeChild(node)
      };
      var clearTimeOut = function() {
          if (timer) window.clearTimeout(timer)
      };
      var autoClose = function() {
          timer = setTimeout(function() {
              clearTimeOut();
              remove()
          }, 3000)
      };
      createStyleElement();
      return {
          msg: function(msg, isClose) {
              createMsgElement(msg, isClose)
          },
          remove: function() {
              if (isExist(id)) {
                  clearTimeOut()
              }
              remove()
          }
      }
  })();