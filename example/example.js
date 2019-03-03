if (Meteor.isClient) {
  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
      Meteor.loginWithWechatWeb({
        loginStyle: 'popup'
        //loginStyle: 'redirect'  you can use redirect for mobile web app
      }, function () {
        console.log('in call back', arguments);
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Accounts.loginServiceConfiguration.remove({
      service: 'wechatWeb'
    });

    Accounts.loginServiceConfiguration.insert({
      service: 'wechatWeb',
      appId: 'APP_ID',
      secret: 'SECRET'
    });
  });
}
