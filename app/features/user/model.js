import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  firstName : DS.attr('String'),
  email: DS.attr('String'),
  pantry: belongsTo('pantry'),
  shoppingList: DS.belongsTo('shopping-list')

});
