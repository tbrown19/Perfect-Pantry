import Ember from 'ember';

export default Ember.Service.extend({
	graphOperations: Ember.inject.service('graph-operations'),

	getAllUserExpenses(users){
		let getSpendingInfo = this.get('graphOperations').generateAllUsersAllTimeExpenses(users).then((results) => {
			console.log(results);
			//spendingPerUser = results[1];
			//return results;
		});


	},

	determineAllUsersPayments(users){
		let usersActualSpending = [];

		return new Promise((resolve) => {
			let userPaymentArray = this.get('graphOperations').generateAllUsersAllTimeExpenses(users).then((results) => {
				results[0].forEach(function (item, index) {
					console.log(results[0][index], results[1][index]);
					let userObject = {
						name: results[0][index],
						spending: results[1][index]
					};
					usersActualSpending.push(userObject);
				});


			});
			userPaymentArray.then(() => {
				console.log(usersActualSpending);
				console.log(usersActualSpending['lois']);
				// usersArray.forEach()
			});

			userPaymentArray.then(() => {
				// console.log("determineAllUsersPayments", usersArray);
				// console.log("determineAllUsersPayments", spendingAmounts);
				resolve("This is where the payments will be returned to the component.");
			});
		});

	},


	addPaymentsToUsersSpending(user){
		let payments = user.get('paymentsToOthers');
		console.log(payments);
	},





	determineUserPayment(user, users){

	}


});
