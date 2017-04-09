import Ember from 'ember';
import moment from 'moment';
import {pluralize} from 'ember-inflector';

export default Ember.Route.extend({
  selectedItems: [],
  test: false,

  model(){
    //Get the user from the application model and return their shopping list
    const application = this.modelFor('application');

    return Ember.RSVP.hash({
      purchasedList: application.purchasedList,
      shoppingList: application.shoppingList,
      pantry: application.pantry
    });

  },

  actions: {
    addNewItems(itemQty, itemName){

      if (itemQty > 1) {
        if (itemName !== pluralize(itemName)) {
          itemName = pluralize(itemName);
        }
      }

      console.log(moment().format());
      //Create a new shopping list item
      const newItem = this.get('store').createRecord('shopping-list-item', {
        name: itemName,
        quantity: itemQty,
        addedDate: moment().format(),
        formattedDate: moment().format('MM-DD-YYYY'),
      });


      //Then add it to the shopping list and save both objects.
      const shoppingList = this.currentModel.shoppingList;
			const pantry = this.modelFor('application').pantry;
			pantry.get('shoppingItems').pushObject(newItem);
			shoppingList.get('shoppingListItems').pushObject(newItem);
			newItem.save().then(() => {
				pantry.save();
				shoppingList.save();
			});


    },

    purchaseItem(item){
      const price = window.prompt("Enter the price of the item");
      //Make sure the value is a digit only.
      if (!isNaN(price) && price > 0) {
        console.log("so you want to buy: " + item.get('name'));
        console.log("And it costs: " + price);


        //Create a new purchased list item taking attributes from the shopping list item object
        const purchasedItem = this.get('store').createRecord('purchased-list-item', {
          name: item.get('name'),
          quantity: item.get('quantity'),
          price: price,
          purchasedDate: moment().format(),
          purchasedDateFormatted: moment().format('MM-DD-YYYY')
        });


        this.currentModel.pantry.get('purchasedItems').pushObject(purchasedItem);
        this.currentModel.pantry.save();


        //Then add it to the shopping list and save both objects.
        const purchasedList = this.currentModel.purchasedList;
        purchasedList.get('purchasedListItems').pushObject(purchasedItem);

        purchasedList.save().then(function () {
          purchasedItem.save();
        });


        //Now that the item has been purchased, we no longer need the database object so we can delete it.
        item.destroyRecord();

      }
    },

    deleteItem(item){
      item.destroyRecord();
    },
  }
});

