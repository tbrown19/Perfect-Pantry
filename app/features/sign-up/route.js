import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  beforeModel() {
    debugger;
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('dashboard');
    }
  },

  actions: {
    signUp(firstName,email,password) {
      const auth = this.get('firebaseApp').auth();
      auth.createUserWithEmailAndPassword(email, password).
      then((userResponse) => {
        const user = this.store.createRecord('user', {
          firstName: firstName,
          email: userResponse.email,
        });
        return user.save();
      });
    }
  }
});
