import Ember from 'ember';

export default Ember.Component.extend({
	spending: Ember.inject.service('services/spending-operations'),
	payments: Ember.inject.service('services/payment-operations'),

	userSpending: '', //We make this blank instead of 0, that way we know if we already checked their spending and got 0
	userPayments: '',
	userContributions: '',


	userSpendingComp: Ember.computed('userSpending', function () {
		//Call the function that will update the user's spending.
		//We then return user spending. Since user spending isn't set to anything at first we are setting it to that,
		//However once the other function finishes, user spending will automatically update and then the comp property will
		//As well. That's why we have the if function, so we don't call user spending more than we need too.
		if(this.get('userSpending') === ''){
			let userSpending = this.get('spending').sumAllTimeUserSpending(this.get('user'));
			userSpending.then((spending) => {
				this.set('userSpending', spending.spending);
			});

		}
		console.log(this.get('user'));
		return this.get('userSpending');
	}),

	userPaymentsComp: Ember.computed('userPayments', function () {
		if(this.get('userPayments') === ''){
			let userPayments = this.get('payments').getSingleUsersPayments(this.get('user'));
			userPayments.then((payments) => {
				this.set('userPayments', payments);
			});
		}
		return this.get('userPayments');
	}),


	userContributionComp: Ember.computed('userSpendingComp','userPaymentsComp', function () {
		return this.get('userSpendingComp') + this.get('userPaymentsComp');
	}),

});
