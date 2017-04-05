import Ember from 'ember';

export default Ember.Component.extend({
	spending: Ember.inject.service('services/spending-operations'),
	payments: Ember.inject.service('services/payment-operations'),

	userSpendingAllTime: '', //We make this blank instead of 0, that way we know if we already checked their spending and got 0
	userPaymentsAllTime: '',
	userContributionAllTime: '',


	userSpendingAllTimeComp: Ember.computed('userSpendingAllTime', function () {
		// //Call the function that will update the user's spending.
		// //We then return user spending. Since user spending isn't set to anything at first we are setting it to that,
		// //However once the other function finishes, user spending will automatically update and then the comp property will
		// //As well. That's why we have the if function, so we don't call user spending more than we need too.
		// if(this.get('userSpendingAllTime') === ''){
		// 	let userSpending = this.get('spending').sumAllTimeUserSpending(this.get('user'));
		// 	userSpending.then((spending) => {
		// 		this.set('userSpendingAllTime', spending);
		// 	});
		//
		// }
		return this.get('userSpendingAllTime');
	}),

	userPaymentsAllTimeComp: Ember.computed('userPaymentsAllTime', function () {
		if(this.get('userPaymentsAllTime') === ''){
			let userPayments = this.get('payments').getSingleUsersPayments(this.get('user'));
			userPayments.then((payments) => {
				this.set('userPaymentsAllTime', payments);
			});
		}
		return this.get('userPaymentsAllTime');
	}),


	userContributionAllTimeComp: Ember.computed('userSpendingAllTimeComp','userPaymentsAllTimeComp', function () {
		return this.get('userSpendingAllTimeComp') + this.get('userPaymentsAllTimeComp');
	}),


});
