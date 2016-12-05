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
          var userEmail = this.get('session').get('currentUser.email');

          //Create a new empty pantry
          var pantry = this.get('store').createRecord('pantry');

          //Create a new empty shopping list
          var shoppingList = this.get('store').createRecord('shopping-list', {
            name: "Shopping List",
          });

          //Query the user from the firebase database based on their email
          this.store.query('user', {
            orderBy: 'email', equalTo: userEmail
          }).then((allUsers) => {
            //Then select the user, set their pantry to the current one, and save both models.
            var wantedUser = allUsers.objectAt(0);
            wantedUser.set('pantry', pantry);
            wantedUser.set('shoppingList', shoppingList);
            wantedUser.save();
            pantry.save();
            shoppingList.save();
          });

          return pantry.save().then(() => {
            this.transitionTo('sign-in');
          });
        });
      });

    }
  }
});
