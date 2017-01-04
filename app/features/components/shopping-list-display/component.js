import Ember from 'ember';

export default Ember.Component.extend({
  test: false,
  sortableProperties: ['Day Added', 'Name', 'Quantity'], //The options the user can sort by
  sortOrders: ['Asc', 'Desc'], //The orders the user can sort in
  sortOrder: 'Asc', // default sort in ascending order
  reverseSort: false, // default sort in ascending order
  sortBy: 'addedDate', // default sort by date items were added to the list
  sortByFormatted: "Day Added",
  checkedItems: [], //Items that have been checked by the user


  //We determine here what we are sorting on, and the order in which we are sorting it.
  sortDefinition: Ember.computed('sortBy', 'reverseSort', function() {
    //Default is false so we sort in ascending order
    let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
    return [ `${this.get('sortBy')}:${sortOrder}` ];
  }),


  //This is where we simply sort all the items, we get sorted defintion from the computed property.
  sortedItems: Ember.computed.sort('items', 'sortDefinition'),

  //We then can limit the sort items if needed, or simply return all of them.
  limitedSortedItems: Ember.computed('sortedItems', function() {
    if(this.get('limit') == false){
      return this.get('sortedItems');
    }
    else{
      console.log(this.get('limit') + 1);
      return this.get('sortedItems').splice(0,this.get('limit'));
    }
  }),


  actions: {

    itemChecked(item){
      console.log("we in this action now boy.");
      console.log(item);
    },

    selectSortProperty(property){
      //Clean and process the property the user selected
      property = property.target.textContent.trim();

      //Set the formatted sort to what they selected, and then update the actual sort order by what they picked.
      this.set('sortByFormatted', property);

      if(property == 'Day Added'){
        this.set('sortBy', 'addedDate');
      }
      else if(property == 'Name'){
        this.set('sortBy', 'name');
      }
      else if(property == 'Quantity'){
        this.set('sortBy', 'quantity');
      }

    },

    selectSortOrder(order){
      //Clean and process the property the user selected
      order = order.target.textContent.trim();

      //Set the formatted sort to what they selected, and then update the actual sort order by what they picked.
      if(order == 'Asc'){
        this.set('sortOrder', 'Asc');
        this.set('reverseSort', false);
      }
      else if(order == 'Desc'){
        this.set('sortOrder', 'Desc');
        this.set('reverseSort', true)

      }
    }

  }



});
