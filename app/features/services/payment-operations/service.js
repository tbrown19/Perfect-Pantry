import Ember from 'ember';

export default Ember.Service.extend({

	getSingleUsersSpending(user){
		return this.get('spending').sumAllTimeUserSpending(user).then((results) => {
			return results.spending;
		});
	},

	getSingleUsersPayments(user){
		return user.get('paymentsToOthers').then((payments) => {
			//Map the value of each payment to an array, and then reduce it to get the total value of all the payments.
			let paymentValues = payments.map((payment) => payment.get('paymentAmount'));
			return paymentValues.reduce((a, b) => a + b, 0);
		});
	},


	getAllUserExpenses(users){
		let getSpendingInfo = this.get('spending').generateAllUsersAllTimeExpenses(users).then((results) => {
			console.log(results);
			//spendingPerUser = results[1];
			//return results;
		});
	},
});
