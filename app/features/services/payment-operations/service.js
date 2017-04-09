import Ember from 'ember';

export default Ember.Service.extend({

	getSingleUsersSpending(user){
		return this.get('spending').sumAllTimeUserSpending(user).then((results) => {
			return results.spending;
		});
	},

	getSingleUsersPayments(user){
		return user.get('paymentsToOthers').then((payments) => {
			let paymentValues = payments.mapBy('paymentAmount');
			return paymentValues.reduce((total, paymentAmount) => total + paymentAmount, 0);
		});
	},


	/*getAllUserExpenses(users){
		// let getSpendingInfo = this.get('spending').generateAllUsersAllTimeExpenses(users).then((results) => {
		// 	console.log(results);
		// 	//spendingPerUser = results[1];
		// 	//return results;
		// });
	},*/
});
