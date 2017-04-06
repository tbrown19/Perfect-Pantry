import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
	spendingHelp: Ember.inject.service('services/spending-operations'),
	paymentsHelp: Ember.inject.service('services/payment-operations'),

	spending: '',
	payments: '',

	firstName: DS.attr('String'),
	lastName: DS.attr('String'),
	email: DS.attr('String'),
	pantry: DS.belongsTo('pantry', {async: true}),
	pendingPantry: DS.belongsTo('pantry'),
	shoppingList: DS.belongsTo('shopping-list', {async: true}),
	purchasedList: DS.belongsTo('purchased-list', {async: true}),
	consumedList: DS.belongsTo('consumed-list', {async: true}),
	paymentsToOthers: DS.hasMany('user-to-user-payment', {inverse: 'sender'}),
	paymentsFromOthers: DS.hasMany('user-to-user-payment', {inverse: 'receiver'}),

	fullName: Ember.computed('firstName', 'lastName', function () {
		return `${this.get('firstName')} ${this.get('lastName')}`;
	}),



	spendingTotals: Ember.computed('spending','purchasedList', function () {
		if (this.get('spending') === '') {
			let userSpending = this.get('spendingHelp').sumAllTimeUserSpending(this);
			userSpending.then((result) => this.set('spending', result.spending));
		}
		return this.get('spending');
	}),


	paymentTotals: Ember.computed('payments', 'paymentsToOthers', function () {
		if (this.get('payments') === '') {
			let userPayments = this.get('paymentsHelp').getSingleUsersPayments(this);
			userPayments.then((payments) => this.set('payments', payments));
		}
		return this.get('payments');
	}),


	contributionTotals: Ember.computed('spendingTotals', 'paymentTotals', function () {
		return this.get('spendingTotals') + this.get('paymentTotals');
	}),

});


