import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  firstName : DS.attr('String'),
	lastName : DS.attr('String'),
	email: DS.attr('String'),
  pantry: DS.belongsTo('pantry', {async: true } ),
  pendingPantry: DS.belongsTo('pantry'),
  shoppingList: DS.belongsTo('shopping-list', {async: true }),
  purchasedList: DS.belongsTo('purchased-list', {async: true }),
	consumedList: DS.belongsTo('consumed-list', {async: true }),
	paymentsToOthers: DS.hasMany('user-to-user-payment', {inverse: 'sender'}),
	paymentsFromOthers: DS.hasMany('user-to-user-payment', {inverse: 'receiver'}),


	fullName: Ember.computed('firstName','lastName',  function () {
		return `${this.get('firstName')} ${this.get('lastName')}`;
	}),

});


