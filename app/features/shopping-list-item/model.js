import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  shoppingList: belongsTo('shopping-list'),

});
