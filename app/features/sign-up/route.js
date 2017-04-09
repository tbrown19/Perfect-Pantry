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
          id: userResponse.uid,
          email: userResponse.email,
					firstName: firstName,
					lastName: lastName,
				});
        // First we save the user, then we can go about updating their pantry and shopping list.
        user.save().then(() => {
          const pantry = this.get('store').createRecord('pantry');
					const shoppingList = this.get('store').createRecord('shopping-list');
          const purchasedList = this.get('store').createRecord('purchased-list');

          user.set('pantry', pantry);
          user.set('shoppingList', shoppingList);
          user.set('purchasedList', purchasedList);

          pantry.save();
          shoppingList.save();
          purchasedList.save();

          return user.save().then(() => {
            this.transitionTo('dashboard');
          });
        });
      }).catch(function (err) {
				console.log(err);
			});
    }
  }
});
