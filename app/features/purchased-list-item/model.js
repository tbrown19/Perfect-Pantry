import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('String'),
  purchasedList: DS.belongsTo('purchased-list', { async: true }),
  pantry: DS.belongsTo('pantry', { async: true }),
  price: DS.attr('number'),
  quantity: DS.attr('number'),
  purchasedDate: DS.attr('String'),
  purchasedDateFormatted: DS.attr('String'),
  consumed: DS.attr('boolean'),
  consumedDate: DS.attr('String'),
  consumedDateFormatted: DS.attr('String'),

});
