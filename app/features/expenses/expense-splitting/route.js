import Ember from 'ember';

export default Ember.Route.extend({

	model(){
		// 	user: user,
		// 	purchasedList: application.purchasedList,
		// 	allUsers: allUsers,
		// 	otherUsers: allUsers.without(user),
		// 	pantry: pantry
		return this.modelFor('expenses');
	},


	actions:{

	},
});
