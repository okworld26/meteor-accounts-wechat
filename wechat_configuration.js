Template.configureLoginServiceDialogForWechatWeb.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForWechatWeb.fields = function () {
  return [
    {property: 'appId', label: 'APP Id'},
    {property: 'secret', label: 'APP Secret'}
  ];
};
