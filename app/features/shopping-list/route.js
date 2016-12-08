import Ember from 'ember';

export default Ember.Route.extend({

  userID: "",


  beforeModel(){
    //Before the model loads get the users ID so that it can be used to find their pantry.
  },

  model(){
    const userEmail = this.get('session').get('currentUser.email');

    return this.store.query('user', {
      orderBy: 'email', equalTo: userEmail
    }).then((allUsers) => {
      const shoppingID = allUsers.objectAt(0).get('shoppingList.id');
      return this.store.findAll('shopping-list').then((shoppingLists) => {
        return shoppingLists.filterBy("id", shoppingID).objectAt(0);
      });
    });


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

    }
  }
});

