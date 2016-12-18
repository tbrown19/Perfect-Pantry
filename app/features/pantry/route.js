import Ember from 'ember';

export default Ember.Route.extend({
  pantryID: "",
  user: 0,
  pantryID: 0,

  beforeModel(){

  },

  model(){
    //Get the user from the application model and return their shopping list
    if(this.get('user') === 0){
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

      //Clear the input form first
      document.getElementById("pantryRequest").value = "";

      //We first need to see if their is a user that matches the email the user entered.
      this.store.query('user', {
        orderBy: 'email', equalTo: email
      }).then((allUsers) => {
        if (allUsers.get('length') === 0) {
          alert("no user found with that email.");
        }
        const pantryID = allUsers.objectAt(0).get('pantry.id');


        //We then take= the user that we found, and find their pantry.
        this.store.findAll('pantry').then((pantries) => {
          const pantry = pantries.filterBy("id", pantryID).objectAt(0);
          //We add the user to the pantry's unconfirmed user, and then update their pending pantry id so that
          pantry.get('unconfirmedUsers').pushObject(this.get('user'));

          //Both the pantry and the user can have some idea of their invite.
          this.get('user').set('pendingPantry',pantry);
          this.get('user').save();

          pantry.save();
        });

      });
    },

    // Allows the user to confirm another users email and add them to their pantry.
    addUserToPantry(userEmail){
      const pantry = this.currentModel;

      //We find the user that the current user wishes to add by the email
      this.store.query('user', {
        orderBy: 'email', equalTo: userEmail
      }).then((allUsers) => {
        const user = allUsers.objectAt(0);

        //We then remove the pending user from the unconfirmed, and add them to the normal users.
        pantry.get('unconfirmedUsers').then((users) => {
          users.removeObject(user);
        });
        pantry.save().then(() => {
          pantry.get('users').then((users) => {
            users.pushObject(user);

          });
        });



        pantry.save();
      });

    },

    // Allows the user to deny another users email,
    // Should probably have a blocked users list or something so that they cant keep sending requests..
    // But that could just be fixed by rewriting the way we add a user like previously suggested.
    denyUserFromPantry(userEmail){

    },

    show() {
      this.$('.modal').modal();
    }

  }


});
