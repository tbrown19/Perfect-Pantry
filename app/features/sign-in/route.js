import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  beforeModel: function() {
    if(this.get('session').get('isAuthenticated')){
      console.log("you are authed")
      this.transitionTo('/dashboard');
    }
  },

  actions: {
    signIn(email,password) {
      //var controller = this.get('controller');
      //var email = controller.get('email');
      //var password = controller.get('password');
      //var self = this;
      console.log("in da sign in action");
      this.get('session').open('firebase', {
        provider: 'password',
        'email': email,
        'password': password
      }).then(() => {
        window.location = '/dashboard';
      });

       //)
        /*
        .then(function (data) {
        console.log(data.currentUser);
        let uid = this.get('session').get('uid');
        this.store.findRecord('user', uid).then(user => {
          console.log(user.get('firstName'));
          self.transitionTo('user', uid);
        });
        */
      //});
    },

  }
});
