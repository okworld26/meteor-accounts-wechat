WechatWeb = {};

WechatWeb.requestCredential = function (options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'wechatWeb'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }
  var credentialToken = Random.secret();
  var loginStyle = OAuth._loginStyle('wechatWeb', config, options);
  var scope = (options && options.requestPermissions) || ['snsapi_login'];
  var flatScope = _.map(scope, encodeURIComponent).join('+');

  var loginUrl =
    'https://open.weixin.qq.com/connect/qrconnect' +
      '?appid=' + config.appId +
      '&response_type=code' +
      '&scope=' + flatScope +
      '&redirect_uri=' + OAuth._redirectUri('wechatWeb', config) +
      '&state=' + OAuth._stateParam(loginStyle, credentialToken);

  OAuth.launchLogin({
    loginService: "wechatWeb"
    , loginStyle: loginStyle
    , loginUrl: loginUrl
    , credentialRequestCompleteCallback: credentialRequestCompleteCallback
    , credentialToken: credentialToken
  });
};
