import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  actions: {
		signInRequest(email,password) {
      console.log("in da sign in action");
      this.get('session').open('firebase', {
        provider: 'password',
        'email': email,
        'password': password
      }).then(() => {
        window.location = '/dashboard';
      });

    },

  }
});
