import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
	firebaseApp: Ember.inject.service(),
	userAuth: Ember.inject.service('services/user-auth'),


  model: function () {
    //Make sure the user is authenticated before we attempt to return the model
    if (this.get('session').get('isAuthenticated')) {
    	console.log("derp");
			//this.transitionTo('dashboard');
			return this.get('userAuth').get('user').then((user) => {
				console.log(this.get('session'));
			  console.log("user2", user);
				const pantry = user.get('pantry');
				return Ember.RSVP.hash({
					user: user,
					pantry: pantry,
					pantryUsers: pantry.get('users'),
					shoppingList: user.get('shoppingList'),
					purchasedList: user.get('purchasedList')
				});
			});
		}
  },

  actions: {

    signOut() {
			//Reload the page first so that all the models unload since the user session has ended, they won't repopulate.
      //Then we can transition to index. otherwise it leads to weird permission errors.
			this.store.peekAll('pantry').forEach((r) => r.unloadRecord());
			this.store.peekAll('user').forEach((r) => r.unloadRecord());
			this.store.peekAll('purchasedList').forEach((r) => r.unloadRecord());
			this.store.peekAll('shoppingList').forEach((r) => r.unloadRecord());

			this.get('firebaseApp').auth().signOut().then(function() {
				console.log("derp?");
				window.location.reload(true);
			}).catch(function(error) {
				// An error happened.
				console.log(error);
			});

		},

    accessDenied: function () {
      return this.transitionTo('landing-page');
    },

		purchaseItem(item){
			console.log("test");
			const price = window.prompt("Enter the price of the item");
			//Make sure the value is a digit only.
			if (!isNaN(price) && price > 0) {
				console.log("so you want to buy: " + item.get('name'));
				console.log("And it costs: " + price);


				//Create a new purchased list item taking attributes from the shopping list item object
				const purchasedItem = this.get('store').createRecord('purchased-list-item', {
					name: item.get('name'),
					quantity: item.get('quantity'),
					price: price,
					purchasedDate: moment().format(),
					purchasedDateFormatted: moment().format('MM-DD-YYYY')
				});


				this.currentModel.pantry.get('purchasedItems').pushObject(purchasedItem);
				this.currentModel.pantry.save();


				//Then add it to the shopping list and save both objects.
				const purchasedList = this.currentModel.purchasedList;
				purchasedList.get('purchasedListItems').pushObject(purchasedItem);

				purchasedList.save().then(function () {
					purchasedItem.save();
				});


				//Now that the item has been purchased, we no longer need the database object so we can delete it.
				item.destroyRecord();

			}
		},

		deleteItem(item){
			item.destroyRecord();
		},


  }

});
