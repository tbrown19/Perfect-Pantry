import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
	firebaseApp: Ember.inject.service(),
	userAuth: Ember.inject.service('services/user-auth'),

  landingPage: true,
	//
  // beforeModel: function () {
		// console.log(this.get('session'));
		// if (this.get('session').get('isAuthenticated')){
		// 	//TODO implement an actual redirect.
		// 	this.transitionTo("dashboard");
	//
		// 	//Get the the url the user is coming from
  //     //This is needed so if the user refreshes it redirects them back the page they were on.
  //     const url = window.location.href;
  //     const split_url = url.split("/");
  //     let redirect;
	//
  //     if (split_url.length > 4) {
  //       //redirect = split_url[split_url.length - 2] + "/" + split_url[split_url.length - 1];
  //     }
  //     else {
  //       redirect = split_url[split_url.length - 1] || "dashboard";
	//
  //     }
	//
  //     //Get just the end item which is the current pages
  //     //console.log("redirect", redirect);
  //   }
  //   else{
		// 	console.log("no session");
		// }
  // },

  model: function () {
    //Make sure the user is authenticated before we attempt to return the model
    if (this.get('session').get('isAuthenticated')) {
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
