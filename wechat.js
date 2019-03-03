Accounts.oauth.registerService('wechatWeb');

if (Meteor.isClient) {
  Meteor.loginWithWechatWeb = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    WechatWeb.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.wechatWeb'],
    forOtherUsers: [
      'services.wechatWeb.username',
      'services.wechatWeb.full_name',
      'services.wechatWeb.profile_picture'
    ]
  });
}
