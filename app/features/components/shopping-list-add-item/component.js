import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  ivalidItemName: false,
  quantity: "",
  itemName: "",

  actions: {
    addNewItems(itemQty, itemName){
      //TODO add validation so that the user has to enter a quantity greater than one for an item

      console.log();

      this.sendAction('addItem',this.get('quantity'), this.get('itemName'));

      this.set('quantity', "");
      this.set('itemName', "");


    }
  }
});
