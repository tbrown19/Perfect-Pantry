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
        user.save().then(() => {
          //Get the user email from the session
          //Done this way so that we dont take direct input from user. idk.
          const userEmail = user.get('email');

          //Create a new empty pantry
          const pantry = this.get('store').createRecord('pantry');

          //Create a new empty shopping list
          const shoppingList = this.get('store').createRecord('shopping-list', {
            name: "Shopping List",
          });


          user.set('pantry', pantry);
          user.set('shoppingList', shoppingList);
          user.save();

          return pantry.save().then(() => {
            this.transitionTo('sign-in');
          });
        });
      });

    }
  }
});
