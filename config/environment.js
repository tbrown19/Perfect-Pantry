/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'perfect-pantry',
    podModulePrefix: 'perfect-pantry/features',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    contentSecurityPolicy: { 'connect-src': "'self' https://auth.firebase.com wss://*.firebaseio.com" },
    firebase: {
      apiKey: "AIzaSyBw3vNME-rEHNhkhlmdGmxEP0a1OKB2Ndc",
      authDomain: "perfect-pantry.firebaseapp.com",
      databaseURL: "https://perfect-pantry.firebaseio.com",
      storageBucket: "perfect-pantry.appspot.com",
      messagingSenderId: "385354777639"
    },

    torii: {
      sessionServiceName: 'session'
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
