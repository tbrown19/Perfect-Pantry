import Ember from 'ember';

export default Ember.Route.extend({
  userID: "",


  beforeModel(){
    //Before the model loads get the users ID so that it can be used to find their pantry.
    const userEmail = this.get('session').get('currentUser.email');
    this.store.query('user', {
      orderBy: 'email', equalTo: userEmail
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
    sendPantryInvite(){

    }
  }
});
