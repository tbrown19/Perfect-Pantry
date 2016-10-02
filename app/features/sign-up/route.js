import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    debugger;
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('dashboard');
    }
  },

  actions: {
    signUp() {
      const auth = this.get('firebase').auth();
      auth.createUserWithEmailAndPassword(this.get('email'), this.get('password')).
      then((userResponse) => {
        const user = this.store.createRecord('user', {
          id: userResponse.uid,
          email: userResponse.email
        });
        return user.save();
      });
    }
  }
});
