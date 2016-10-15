import Ember from 'ember';

export default Ember.Route.extend({
  userID: "",


  beforeModel(){
    //Before the model loads get the users ID so that it can be used to find their pantry.
    var userEmail = this.get('session').get('currentUser.email');
    this.store.query('user', {
      'filter[email]': userEmail
    }).then((allUsers) => {
      //Then select the user, set their pantry to the current one, and save both models.
      this.set('userID',allUsers.objectAt(0).get('pantry.id'));
    });
  },

  model(){
    return this.store.findAll('pantry').then((pantries) => {
      return pantries.filterBy("id", this.get('userID')).objectAt(0);
    });



  },

  actions: {
    createPantry(pantryName){
      //Get the user email from the session
      var userEmail = this.get('session').get('currentUser.email');

      //Create a new empty pantry
      var pantry = this.get('store').createRecord('pantry', {
        name: pantryName,
      });

      //Create a new empty shopping list
      var shoppingList = this.get('store').createRecord('shopping-list', {
        name: "Shopping List",
      });


      var wantedUser;
      //Query the user from the firebase database based on their email
      this.store.query('user', {
        'filter[email]': userEmail
      }).then((allUsers) => {
        //Then select the user, set their pantry to the current one, and save both models.
        wantedUser = allUsers.objectAt(0);
        wantedUser.set('pantry', pantry);
        wantedUser.set('shopping-list', shoppingList);
        wantedUser.save();
        pantry.save();
        shoppingList.save();
      });

      return pantry.save();
    },

  }
});
