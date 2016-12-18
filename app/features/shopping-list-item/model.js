import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  name: DS.attr('String'),
  shoppingList: DS.belongsTo('shopping-list', { async: true }),
  price: DS.attr('number'),
  quantity: DS.attr('number'),

});
