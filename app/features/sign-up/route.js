import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('dashboard');
    }
  },

  actions: {
    signUpRequest(email, firstName, lastName, password) {
      const auth = this.get('firebaseApp').auth();
      auth.createUserWithEmailAndPassword(email, password).then((userResponse) => {
        const user = this.store.createRecord('user', {
          email: userResponse.email,
					firstName: firstName,
					lastName: lastName,
				});
        // First we save the user, then we can go about updating their pantry and shopping list.
        user.save().then(() => {
          //Create a new empty pantry
          const pantry = this.get('store').createRecord('pantry');

          //Create a new empty shopping list
          const shoppingList = this.get('store').createRecord('shopping-list');

          const purchasedList = this.get('store').createRecord('purchased-list');

          user.set('pantry', pantry);
          user.set('shoppingList', shoppingList);
          user.set('purchasedList', purchasedList);

          pantry.save();
          shoppingList.save();
          purchasedList.save();

          return user.save().then(() => {
            this.transitionTo('sign-in');
          });
        });
      }).catch(function (err) {
				console.log(err);
			});
    }
  }
});
