import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
	//Helper services we use in the model
	spendingHelp: Ember.inject.service('services/spending-operations'),
	paymentsHelp: Ember.inject.service('services/payment-operations'),

	//Model attributes stored in database
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


	//Computed properties for the model
	fullName: Ember.computed('firstName', 'lastName', function () {
		return `${this.get('firstName')} ${this.get('lastName')}`;
	}),

	//Returns a promise that contains the user's spending
	spendingTotals: Ember.computed('purchasedList', function () {
		return this.get('spendingHelp').sumAllTimeUserSpending(this).then(result => result.spending);
	}),

	//Returns a promise that contains the user's payments
	paymentTotals: Ember.computed('paymentsToOthers', function () {
		return this.get('paymentsHelp').getSingleUsersPayments(this).then(result => result);
	}),

	//Returns a promise that contains the user's total contributions to the pantry
	contribTotals: Ember.computed('spendingTotals', 'paymentTotals', function () {
		return this.get('spendingTotals')
			.then((spending) => this.get('paymentTotals')
				.then((payments) => spending + payments));
	})

});


