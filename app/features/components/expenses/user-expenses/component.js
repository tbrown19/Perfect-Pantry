import Ember from 'ember';

export default Ember.Component.extend({
	graphOperations: Ember.inject.service('graph-operations'),

	spending: Ember.computed('spending', function () {
		const otherUsers = this.get('otherUsers');
		const users = this.get('users');

		otherUsers.forEach((user) => {
			console.log(user.get('firstName'));
		});

		let userNames = [];
		let spendingPerUser = [100,100,200,200];

		let getSpendingInfo = this.get('graphOperations').generateAllUsersAllTimeExpenses(users).then((results) => {
			userNames = results[0];
			//spendingPerUser = results[1];
			//return results;
		});


		let getCostPerUser = getSpendingInfo.then(() => {
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
