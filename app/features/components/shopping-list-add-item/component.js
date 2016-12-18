import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  ivalidItemName: false,


  actions: {
    addNewItems(itemQty, itemName){
      //TODO add validation so that the user has to enter a quantity greater than one for an item

      console.log(itemQty);
      //Clear the input forms first
      document.getElementById("new-shopping-list-item").value = "";
      document.getElementById("new-shopping-list-item-qty").value = "";


      //Define the item name here, that way if there is not input, it will just be set to blank
      itemName = itemName||"";

      //Check the item name length here, and if its invalid, then change the boolean
      if(itemName.length > 2){
        //Send the action(addItem), the route will then catch it.
        this.set('ivalidItemName',false);
        this.sendAction('addItem',itemQty, itemName);
      }
      else{
        this.set('ivalidItemName',true);

      }
    }
  }
});
