import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  shoppingListItems: hasMany('shopping-list-item', { async: true }),



  //Hard coding this for now, but will change later. Will look into how to best make it so we can return the first x,
  //items in the order of : date, price, urgency, etc.
  first5Items: Ember.computed('shoppingListItems', function() {
    return this.get('shoppingListItems').slice(0,5);
  }),


});
