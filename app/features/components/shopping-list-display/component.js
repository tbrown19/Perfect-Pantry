import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'ul',
  sortedItems: Ember.computed.sort('items', 'sortDefinition'),
  limitedSortedItems: Ember.computed('limitedSortedItems', function() {
    if(this.get('limit') == false){
      return this.get('sortedItems');
    }
    else{
      console.log(this.get('limit') + 1);
      return this.get('sortedItems').splice(0,this.get('limit'));
    }
  }),

  sortBy: 'addedDate', // default sort by date
  sortDefinition: Ember.computed('sortBy', function() {
    return [ this.get('sortBy') + ":asc" ].splice(0,1);
  }),


});
