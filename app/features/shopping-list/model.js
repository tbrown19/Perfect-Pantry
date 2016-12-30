import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';

export default DS.Model.extend({
  user: DS.belongsTo('user', {async: true} ),
  shoppingListItems: hasMany('shopping-list-item', {async: true }),


});
