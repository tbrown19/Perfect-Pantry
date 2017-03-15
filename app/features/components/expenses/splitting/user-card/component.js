import Ember from 'ember';

export default Ember.Component.extend({

	totalSpentOnShopping: Ember.computed('other', function () {
		return this.get('other');
	}),

	totalPaidToOthers: Ember.computed('other', function () {
		return this.get('other');
	}),


	totalAmountContributed: Ember.computed('totalPaidToOthers','totalSpentOnShopping' , function () {
		return this.get('totalPaidToOthers') + this.get('totalSpentOnShopping');
	}),

});
