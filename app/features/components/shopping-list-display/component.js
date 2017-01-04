import Ember from 'ember';

export default Ember.Component.extend({
  checkedItems: [],
  tagName: 'ul',
  reverseSort: false, // default sort in ascending order
  sortBy: 'addedDate', // default sort by date items were added to the list

  //We determine here what we are sorting on, and the order in which we are sorting it.
  sortDefinition: Ember.computed('sortBy', 'reverseSort', function() {
    //Default is false so we sort in ascending order
    let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
    return [ `${this.get('sortBy')}:${sortOrder}` ];
  }),


  //This is where we simply sort all the items, we get sorted defintion from the computed property.
  sortedItems: Ember.computed.sort('items', 'sortDefinition'),

  //We then can limit the sort items if needed, or simply return all of them.
  limitedSortedItems: Ember.computed('limitedSortedItems', function() {
    if(this.get('limit') == false){
      return this.get('sortedItems');
    }
    else{
      console.log(this.get('limit') + 1);
      return this.get('sortedItems').splice(0,this.get('limit'));
    }
  }),


  checkedItem: Ember.computed('checkedItem', function() {
    //Default is false so we sort in ascending order
    //console.log(this.get('checkedItem'));
    console.log("you checked some shit.");
    let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
  }),

  actions: {

    itemChecked(item){
      console.log("we in this action now boy.");
      console.log(item);
    }

  }


});
