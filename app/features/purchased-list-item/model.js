import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('String'),
  purchaseList: DS.belongsTo('purchased-list', { async: true }),
  price: DS.attr('number'),
  quantity: DS.attr('number'),
  purchasedDate: DS.attr('String'),
  consumedDate: DS.attr('String'),
});
