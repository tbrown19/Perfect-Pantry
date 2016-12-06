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
      this.set('userID', allUsers.objectAt(0).get('pantry.id'));
    });
  },

  model(){
    return this.store.findAll('pantry').then((pantries) => {
      return pantries.filterBy("id", this.get('userID')).objectAt(0);
    });


  },

  actions: {
    // Lets a user to request to join a pantry.
    // Easier on the back end to have a user simply request to join a pantry by knowing one of the users emails
    // However it would definitely be better to have it where we invite people rather than have requests.
    // Will change some time.
    sendPantryRequest(email){
      alert(email);

      this.store.query('user', {
        orderBy: 'email', equalTo: email
      }).then((allUsers) => {
        console.log('email')
        console.log(allUsers);
        //Then select the user, set their pantry to the current one, and save both models.
        const pantryID = allUsers.objectAt(0).get('pantry.id');
        const user = allUsers.objectAt(0);
        const userID = allUsers.objectAt(0).get('pantry.id');
        console.log(userID);
        console.log(pantryID);

        this.store.findAll('pantry').then((pantries) => {
          let pantry = pantries.filterBy("id", this.get('userID')).objectAt(0);
          console.log(pantry);
          console.log(pantry.get('id'));

          pantry.get('unconfirmedUsers').pushObject(user);
          console.log(pantry.get('unconfirmedUsers'));
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
