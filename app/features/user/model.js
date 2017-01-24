import DS from 'ember-data';

export default DS.Model.extend({
  firstName : DS.attr('String'),
	lastName : DS.attr('String'),
	email: DS.attr('String'),
  pantry: DS.belongsTo('pantry', {async: true } ),
  pendingPantry: DS.belongsTo('pantry'),
  shoppingList: DS.belongsTo('shopping-list', {async: true }),
  purchasedList: DS.belongsTo('purchased-list', {async: true }),
	paymentsToOthers: DS.hasMany('user-to-user-payment', {async: true }),
});


