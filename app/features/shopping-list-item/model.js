import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  name: DS.attr('String'),
  shoppingList: belongsTo('shopping-list'),

});
