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


	graphOperations: Ember.inject.service('graph-operations'),
	expenseOperations: Ember.inject.service('expense-operations'),

	spending: Ember.computed('spending', function () {
		const otherUsers = this.get('otherUsers');
		const users = this.get('users');

		otherUsers.forEach((user) => {
			console.log(user.get('firstName'));
		});

		let userNames = [];
		let spendingPerUser = [100,100,200,200];
		let derp = this.get('expenseOperations').determineAllUsersPayments(users).then((results) => {
			console.log("results go here");
			console.log(results);
		});

		let getSpendingInfo = this.get('graphOperations').generateAllUsersAllTimeExpenses(users).then((results) => {
			console.log(results);
			userNames = results[0];
			//spendingPerUser = results[1];
			//return results;
		});

		let getCostPerUser = getSpendingInfo.then(() => {
			console.log(userNames);
			let totalSpent = spendingPerUser.reduce((a, b) => a + b, 0);
			return totalSpent / users.length;
		});

		getCostPerUser.then((costPerUser) => {
			console.log(spendingPerUser);
			let differenceFromCost = spendingPerUser.map((x) => x - costPerUser);
			console.log(differenceFromCost);
		});
	}),

});
