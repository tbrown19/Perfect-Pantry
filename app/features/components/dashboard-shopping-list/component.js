import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  sortedItems: Ember.computed.sort('items', 'sortDefinition'),
  sortBy: 'addedDate', // default sort by date
  sortDefinition: Ember.computed('sortBy', function() {
    return [ this.get('sortBy') + ":asc" ];
  }),


});
