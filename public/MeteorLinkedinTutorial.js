// How to install
// If you have meteorite, the smart package manager for atmosphere:
//   ~/myProject$ mrt install meteor-linkedin
//   ~/myProject$ mrt install meteor-accounts-linkedin
// Otherwise:
//   ~/myProject$ mkdir packages
//   ~/myProject$ cd packages
//   ~/myProject$ git clone https://github.com/yefim/meteor-linkedin
//   ~/myProject$ mv meteor-linkedin linkedin
//   ~/myProject$ git clone https://github.com/yefim/meteor-accounts-linkedin
//   ~/myProject$ mv meteor-accounts-linkedin accounts-linkedin
//   ~/myProject$ meteor add linkedin
//   ~/myProject$ meteor add accounts-linkedin

// You will need to use your linkedin account to get a key for you application here:
//   https://www.linkedin.com/secure/developer
// You will also use the above page to set up the accept and cancel URLs

// Add the following code to your startup function on the server

// PurdueMade
// API Key: 77qpifi3kg92ms
// Secret Key: EGvQ58PMTBwuFRxN
// OAuth User Token: aae8b980-a6d4-4f3c-bf27-ca3adc6da119
// OAuth User Secret: 1555cf01-eb7f-4f00-bc44-4dc94c7f66bb
// Prevents redundancies
Accounts.loginServiceConfiguration.remove({
  service: "linkedin"
});
Accounts.loginServiceConfiguration.insert({
  service: "linkedin",
  clientId: "Your API Key",
  secret: "Your Secret Key"
});

// On the client, you will be making a call to Meteor.loginWithLinkedin([options], callback);
Meteor.loginWithLinkedin(function(err){
  // Your error function goes here
  console.log(err);
});

// loginWithLinkedin is defined as follows
// This is just for reference
Meteor.loginWithLinkedin = function (options, callback) {
  var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
  LinkedIn.requestCredential(options, credentialRequestCompleteCallback);
};
LinkedIn.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  // This is where you will need the configuration
  var config = ServiceConfiguration.configurations.findOne({service: 'linkedin'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = Random.id();

  var scope = [];
  if (options && options.requestPermissions) {
      scope = options.requestPermissions.join('+');
  }

  var loginUrl =
        'https://www.linkedin.com/uas/oauth2/authorization' +
        '?response_type=code' + '&client_id=' + config.clientId +
        '&redirect_uri=' + encodeURIComponent(Meteor.absoluteUrl('_oauth/linkedin?close')) +
        '&scope=' + scope + '&state=' + credentialToken;

  Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback);
};