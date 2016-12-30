import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  name: DS.attr('String'),
  users: hasMany('user', {async: true , inverse: 'pantry'}),
  unconfirmedUsers: hasMany('user', {inverse: 'pendingPantry'}),
  items: hasMany('purchased-list-item'),
  shoppingItems: hasMany('shopping-list-item')
});
