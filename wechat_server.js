WechatWeb = {};

OAuth.registerService('wechatWeb', 2, null, function(query) {

  var response = getTokenResponse(query);
  var accessToken = response.access_token;
  var identity = response.user;

  var serviceData = _.extend(identity, {accessToken: response.access_token});

  return {
    serviceData: serviceData,
    options: {
      profile: { name: identity.full_name },
      services: { wechatWeb: identity }
    }
  };
});

var getTokenResponse = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'wechatWeb'});

  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var response;
  try {
    response = HTTP.post(
      "https://api.weixin.qq.com/sns/oauth2/access_token", {
        params: {
          code: query.code,
          appid: config.appId,
          secret: OAuth.openSecret(config.secret),
          grant_type: 'authorization_code'
        }
      });

    if (response.error) // if the http response was an error
        throw response.error;
    if (typeof response.content === "string")
        response.content = JSON.parse(response.content);
    if (response.content.error)
        throw response.content;
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with WechatWeb. " + err.message),
                   {response: err.response});
  }

  return response.content;
};

WechatWeb.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
