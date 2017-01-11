import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({

  model: function () {
    const user = this.modelFor('application');
    return this.store.query('shoppingListItem', {
      orderBy: 'pantry', equalTo: user.get('pantry.id')
    }).then((shoppingItems) => {
      return Ember.RSVP.hash({
        shoppingItems: shoppingItems,
        purchasedList: user.get('purchasedList')
      });
    });


  },


  actions: {
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

        console.log(purchasedItem);

        const pantry = this.modelFor('pantry');
        pantry.get('purchasedItems').pushObject(purchasedItem);
        pantry.save();
        console.log(purchasedItem.get('purchasedDate'));
        //Then add it to the shopping list and save both objects.
        const purchasedList = this.currentModel.purchasedList;
        purchasedList.get('purchasedListItems').pushObject(purchasedItem);
        purchasedList.save().then(function () {
          purchasedItem.save();
        });

      }


    }
  }
});
