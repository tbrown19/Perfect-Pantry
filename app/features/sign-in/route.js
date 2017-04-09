import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  model(){
    console.log(this.get('session'));
	},


  actions: {
		signInRequest(email,password) {
      this.get('session').open('firebase', {
        provider: 'password',
        'email': email,
        'password': password
      }).then(() => {
        this.transitionTo('dashboard');
      });

    },

  }
});
