import Ember from 'ember';

export default Ember.Route.extend({
  user: 0,
  pantryID: 0,


  model(){
    //Get the user from the application model and return their shopping list
    if (this.get('user') === 0) {
      const user = this.modelFor('application');
      this.set('user', user);
      this.set('pantryID', user.get('pantry.id'));
    }

    //return this.get('pantry');
    return this.store.findAll('pantry').then((pantries) => {
      return pantries.filterBy("id", this.get('pantryID')).objectAt(0);
    });


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
      }).then((allUsers) => {
        //TODO For now there is simply an alert if there is no user with that email. will change to be modal later.
        if (allUsers.get('length') === 0) {
          alert("no user found with that email.");
        }
        else {
          //Get the pantryID of the pantry we are trying to join, NOT the current users pantry.
          const pantryID = allUsers.objectAt(0).get('pantry.id');

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

    // Allows the user to confirm another users email and add them to their pantry.
    addUserToPantry(userEmail){

      //We find the user that the current user wishes to add by the email
      this.store.query('user', {
        orderBy: 'email', equalTo: userEmail
      }).then((allUsers) => {
        const pantry = this.currentModel;
        const user = allUsers.objectAt(0);
        const delPantryID = user.get('pantry.id');

        //It's most important to add the user to the new pantry, so we perform this first in case anything bad happens.
        pantry.get('users').then((users) => {
          //After getting all the users we now push our desired user to be a part of it.
          users.pushObject(user);

          //We save the pantry just to be safe, and then continue on to the code for removing the user from pending.
          users.pushObject(user);
          pantry.get('unconfirmedUsers').then((users) => {
            //Remove the now accepted user from the pending user list
            users.removeObject(user);
            //That was the only action we performed on the pantry so we save it now
            //Now delete the pantry the user already had, since they are now part of a different one
            this.store.findAll('pantry').then((pantries) => {

              const delPantry = pantries.filterBy("id", delPantryID).objectAt(0);

              delPantry.destroyRecord();
              //Update the users pantry to be the one that they just joined.
              user.set('pantry', pantry);
              //Set their pending pantry back to being null.
              user.set('pendingPantry', null);
              //Save the user and then refresh the page to make sure that the page updates.
              user.save().then(() => {
                pantry.save();
                this.refresh();
              });
            });

          });

        });
      });
    },

    // Allows the user to deny another users email,
    // Should probably have a blocked users list or something so that they cant keep sending requests..
    // But that could just be fixed by rewriting the way we add a user like previously suggested.
    denyUserFromPantry(userEmail){

    },


  }


});
