// Request LinkedIn credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
LinkedIn.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

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
        '&scope=r_fullprofile%20r_network' + '&state=' + credentialToken;

  // loginUrl = loginUrl.replace("localhost", "127.0.0.1");

  Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback);
};

LinkedIn.requestProfile = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

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

  var url =
        'http://api.linkedin.com/v1/people/~' +
        '?response_type=code' + '&client_id=' + config.clientId +
        '&redirect_uri=' + encodeURIComponent(Meteor.absoluteUrl('')) +
        '&scope=' + scope + '&state=' + credentialToken;

  $.get( url, function( data ) {
    alert( "Data Loaded: " + data );
  });
};
