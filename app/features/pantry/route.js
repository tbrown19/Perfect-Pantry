import Ember from 'ember';

export default Ember.Route.extend({
  pantryID: "",
  user: null,

  beforeModel(){
    //Before the model loads get the users ID so that it can be used to find their pantry.
    const userEmail = this.get('session').get('currentUser.email');
    this.store.query('user', {
      orderBy: 'email', equalTo: userEmail
    }).then((allUsers) => {
      //Then select the user, set their pantry to the current one, and save both models.
      this.set('pantryID', allUsers.objectAt(0).get('pantry.id'));
      this.set('user', allUsers.objectAt(0));

    });
  },

  model(){
    return this.store.findAll('pantry').then((pantries) => {
      return pantries.filterBy("id", this.get('pantryID')).objectAt(0);
    });


  },

  actions: {
    // Lets a user to request to join a pantry.
    // Easier on the back end to have a user simply request to join a pantry by knowing one of the users emails
    // However it would definitely be better to have it where we invite people rather than have requests.
    // Will change some time.
    // TODO add code so that a user cannot join a pantry they are already a member of, and so that
    sendPantryRequest(email){

      document.getElementById("pantryRequest").value = "";

      // We first need to see if their is a user that matches the email the user entered.
      this.store.query('user', {
        orderBy: 'email', equalTo: email
      }).then((allUsers) => {
        if (allUsers.get('length') === 0) {
          alert("no user found with that email.");
        }
        var pantryID = allUsers.objectAt(0).get('pantry.id');


        this.store.findAll('pantry').then((pantries) => {
          var pantry = pantries.filterBy("id", pantryID).objectAt(0);
          pantry.get('unconfirmedUsers').pushObject(this.get('user'));
          this.get('user').set('pendingPantry',pantry);
          this.get('user').save();
          pantry.save();
        });

      });
    },

    // Allows the user to confirm another users email and add them to their pantry.
    addUserToPantry(userEmail){
      this.store.query('user', {
        orderBy: 'email', equalTo: userEmail
      }).then((allUsers) => {
        const user = allUsers.objectAt(0);
        const userID = allUsers.objectAt(0).get('pantry.id');
        let pantry = this.currentModel;

        pantry.get('unconfirmedUsers').removeObject(user);
        pantry.get('users').pushObject(user);
        pantry.save().then(() => {
          alert("pantry saved.");
        });
      });

    },

    // Allows the user to deny another users email,
    // Should probably have a blocked users list or something so that they cant keep sending requests..
    // But that could just be fixed by rewriting the way we add a user like previously suggested.
    denyUserFromPantry(userEmail){

    }

  }


});
