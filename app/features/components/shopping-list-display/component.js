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
  itemsCheckedText: "ALL", //Default text that displays on the delete button.

  checkAll: false,
  selectAllText: "Select", //Default is we want to show them they can select all

  showingAreYouSureMenu: false, //By default we don't want to show the user the are you sure modal


  //We determine here what we are sorting on, and the order in which we are sorting it.
  sortDefinition: Ember.computed('sortBy', 'reverseSort', function() {
    //Default is false so we sort in ascending order
    let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
    return [ `${this.get('sortBy')}:${sortOrder}` ];
  }),


  //This is where we simply sort all the items, we get sorted definition from the computed property.
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

  changeInCheckedItems: Ember.observer('checkedItems.@each', function() {
    // deal with the change
    if( this.get('checkedItems').toArray().length > 0){
      console.log("test?");
      this.set('itemsCheckedText', 'Selected');
    }
    else{
      this.set('itemsCheckedText', 'All');
    }
  }),


  actions: {

    //Handles the un-checking and checking of shopping list items.
    itemChecked(item){
      console.log("you just chcked " + item.get('name'));
      //We simply check to see if the item is in the checked list, and if so remove it, otherwise add it.
      if( !this.get('checkedItems').includes(item)){
        this.get('checkedItems').addObject(item);
      }
      else{
        this.get('checkedItems').removeObject(item);
      }
    },

    //Handles allowing the user to chose a property that they wish to sort by
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

    //Handles allowing the user to chose the order they wish to sort in
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
    },

    selectAllItems(){
      //Simply update the check all property and the handlebars template handles the rest
      this.set('checkAll', !this.get('checkAll'));

      //Also update the select all text so handlebars knows whether to display select or deselect.
      if(this.get('checkAll') == true){
        this.set('selectAllText', 'Deselect');
      }
      else{
        this.set('selectAllText', 'Select');
      }
    },



    //Handles the user clicking the delete button
    deleteButtonClicked(){
      //Show the are you sure menu if they clicked the delete menu.
      this.set('showingAreYouSureMenu', true);
    },

    //Handles the delete action dialog, including closing it and processing the user's choice.
    deleteDialogAction(param1,param2){
      //Any action the user performs hides the menu so we make sure to hide it first.
      this.set('showingAreYouSureMenu', false);

      if(param1 == "ok"){
        console.log("so you want to delete some stuff.");
        //If they have nothing checked and they still want to delete, then we will delete all the items for them.
        if(this.get('checkAll')){
            console.log("they have all items selected.")
        }
        else{
          this.get('checkedItems').forEach(function (item) {
            console.log(item.get('name'));
          })

        }
      }

    }

  }



});
