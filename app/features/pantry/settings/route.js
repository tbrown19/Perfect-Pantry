import Ember from 'ember';

export default Ember.Route.extend({
  user: 0,
  pantryID: 0,


  model(){
    return this.modelFor('pantry');
  },

  actions: {
    // Lets a user to request to join a pantry.
    // Easier on the back end to have a user simply request to join a pantry by knowing one of the users emails
    // However it would definitely be better to have it where we invite people rather than have requests.
    // Will change some time.
    // TODO add code so that a user cannot join a pantry they are already a member of.
    sendPantryRequest(email){

      console.log('in da action');

      //We first need to see if their is a user that matches the email the user entered.
      this.store.query('user', {
        orderBy: 'email', equalTo: email
      }).then((user) => {
        //TODO For now there is simply an alert if there is no user with that email. will change to be modal later.
        if (user.get('length') === 0) {
          alert("no user found with that email.");
        }
        else {
          //Get the pantryID of the pantry we are trying to join, NOT the current users pantry.
          const pantryID = user.objectAt(0).get('pantry.id');

          //We then take the user that we found and their pantry id then find their pantry.
          this.store.findAll('pantry').then((pantries) => {
            const pantry = pantries.filterBy("id", pantryID).objectAt(0);
            //We add the user to the pantry's unconfirmed user, and then update their pending pantry id so that
            pantry.get('unconfirmedUsers').pushObject(this.get('user'));

            //Both the pantry and the user can have some idea of the invite.
            this.get('user').set('pendingPantry', pantry);
            this.get('user').save();

            pantry.save();

          });
        }

      });
    },

  }

});

