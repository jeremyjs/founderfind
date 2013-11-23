Meteor.loginWithLinkedin = function (options, callback) {
  var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
  LinkedIn.requestCredential(options, credentialRequestCompleteCallback);
};

Meteor.getLinkedinProfile = function (options, callback) {
  var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
  LinkedIn.requestProfile(options, credentialRequestCompleteCallback);
};
