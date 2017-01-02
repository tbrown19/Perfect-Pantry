import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';
import moment from 'moment';


export default DS.Model.extend({
  name: DS.attr('String'),
  shoppingList: DS.belongsTo('shopping-list', { async: true }),
  pantry: DS.belongsTo('pantry', { async: true }),
  price: DS.attr('number'),
  quantity: DS.attr('number'),
  addedDate: DS.attr('String'),
  formattedDate: DS.attr('String'),



});
