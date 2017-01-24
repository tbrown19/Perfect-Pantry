import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('String'),
  shoppingList: DS.belongsTo('shopping-list', { async: true }),
  pantry: DS.belongsTo('pantry', { async: true }),
  price: DS.attr('number'),
  quantity: DS.attr('number'),
  addedDate: DS.attr('String'),
  formattedDate: DS.attr('String'),
  tags: DS.attr(),


});
