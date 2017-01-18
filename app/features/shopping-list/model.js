import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user', {async: true} ),
  shoppingListItems: DS.hasMany('shopping-list-item', {async: true }),


});
