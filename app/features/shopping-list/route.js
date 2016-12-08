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
    addNewItems(itemName){

      //Create a new shopping list item
      const newItem = this.get('store').createRecord('shopping-list-item', {
        name: itemName
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
        console.log("its already in there");
      }
      else{
        selectedItems.addObject(item);
        console.log('its not in there.');
      }
    }
  }
});

