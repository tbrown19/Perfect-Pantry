import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({

  selectedItems: [],
  test: false,

  model(){
    //Get the user from the application model and return their shopping list
    const user = this.modelFor('application');
    return user.get('shoppingList');

  },


  actions: {
    addNewItems(itemQty, itemName){
      console.log(moment().format());
      const pantryID = this.modelFor('application').get('pantry.id');
      //Create a new shopping list item
      const newItem = this.get('store').createRecord('shopping-list-item', {
        name: itemName,
        quantity: itemQty,
        addedDate: moment().format(),
        formattedDate: moment().format('MM-DD-YYYY'),
      });

      //Then add it to the shopping list and save both objects.
      const shoppingList = this.currentModel;
      this.store.findAll('pantry').then((pantries) => {
        const pantry = pantries.filterBy("id", pantryID).objectAt(0);
        pantry.get('shoppingItems').pushObject(newItem);
        shoppingList.get('shoppingListItems').pushObject(newItem);
        newItem.save().then(() => {
          pantry.save()
          shoppingList.save();
        });

      });

      this.refresh();


    },

    selectItem(item){
      const selectedItems = this.get('selectedItems');
      if (selectedItems.includes(item)) {
        selectedItems.removeObject(item);
        console.log("removing object");
      }
      else {
        selectedItems.addObject(item);
        console.log('adding object');
      }
    },

    selectAll(){
      const shoppingList = this.currentModel;
      var checkboxes = document.getElementsByName('options');
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = event.currentTarget.checked;
      }

    },

    refreshModel(){
      console.log("refreshing that shiz");
      //this.currentModel.reload();
    }
  }
});

