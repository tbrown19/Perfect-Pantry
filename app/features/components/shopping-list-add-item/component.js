import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  ivalidItemName: false,


  actions: {
    addNewItems(itemName){
      //Define the item name here, that way if there is not input, it will just be set to blank
      var itemName = itemName||"";

      //Check the item name length here, and if its invalid, then change the boolean
      if(itemName.length > 3){
        //Send the action(addItem), the route will then catch it.
        this.set('ivalidItemName',false);
        this.sendAction('addItem',itemName);
      }
      else{
        this.set('ivalidItemName',true);

      }
    }
  }
});
