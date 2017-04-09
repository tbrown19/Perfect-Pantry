import Ember from 'ember';

export default Ember.Service.extend({
	spending: Ember.inject.service('services/spending-operations'),

	determineAllUsersPayments(users){

		return new Promise((resolve) => {
			let userPaymentArray = this.generateUserSpendingObjects(users).then((users2) => {
				console.log(users2);
			});
			userPaymentArray.then(() => {
				// console.log("determineAllUsersPayments", usersArray);
				// console.log("determineAllUsersPayments", spendingAmounts);
				resolve("this is where the user payments will go.");
			});
		});


	},


	addPaymentsToUsersSpending(user){
		let payments = user.get('paymentsToOthers');
		console.log(payments);
	},




	// determineUserPayment(user, users){
	//
	// },


	generateUserSpendingObjects(users){
		let userSpendingObjects = [];

		//Return a new promise because we are dependent on getting each users items.
		return new Promise((resolve) => {

			//We begin by getting the purchased list for each user, and creating an array that is filled with
			let purchasedLists = users.map((user) => {
				return user.get('purchasedList').then((purchasedList) => {
					return [user, purchasedList];
				});
			});


			//First we have to resolve all the users purchased lists, before we can go on to summing the items from them.
			Promise.all(purchasedLists).then((results) => {
				let allUsersSums = results.map((result) => {
					return this.get('spending').sumAllTimeUserSpending(result[0], result[1]);
				});
				//After we have allUsersSums, an array that contains information about how much each user has spent all time, we move on.
				Promise.all(allUsersSums).then((userSpending) => {
					//Map the spending of each user to an object that contains the user, as well as their spending. This makes
					//it easier for us to do the math at later points, while still having the original user object.
					userSpending.forEach(function (user, index) {
						//Create a new user object using the user model, as well as their all time spending.
						let userObject = {
							user: userSpending[index][0],
							spending: userSpending[index][1]
						};
						userSpendingObjects.push(userObject);
					});
					//Once we finish adding each user to our array of users, we can resolve the promise.
					resolve(userSpendingObjects);

				}).catch(function (err) {
					console.log(err);
				});

			});
		});
	}


});
