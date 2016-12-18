import Ember from 'ember';

export default Ember.Route.extend({
  selectedItems: [],
  test: false,

  model(){
    //Get the user from the application model and return their shopping list
    const user = this.modelFor('application');
    return user.get('shoppingList');

  },


  actions: {
    addNewItems(itemQty,itemName){

      //Create a new shopping list item
      const newItem = this.get('store').createRecord('shopping-list-item', {
        name: itemName,
        quantity: itemQty
      });

      //Then add it to the shopping list and save both objects.
      const shoppingList = this.currentModel;
      shoppingList.get('shoppingListItems').pushObject(newItem);
      shoppingList.save().then(function () {
        newItem.save();
      });

    },

    selectItem(item){
      const selectedItems = this.get('selectedItems');
      if(selectedItems.includes(item)){
        selectedItems.removeObject(item);
        console.log("removing object");
      }
      else{
        selectedItems.addObject(item);
        console.log('adding object');
      }
    },

    selectAll(){
      const shoppingList = this.currentModel;
      var checkboxes = document.getElementsByName('options');
      for(var i=0; i<checkboxes.length; i++) {
        checkboxes[i].checked = event.currentTarget.checked;
      }

    }
  }
});

