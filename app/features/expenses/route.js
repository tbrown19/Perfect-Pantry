import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  user: 0,

  beforeModel(){
    //If we do it like this, we only have to query for the user after a page reload rather than transition within app
    if (this.get('user') === 0) {
      const user = this.modelFor('application');
      this.set('user', user);
    }


  },

  model(){
    const user = this.get('user');
    //Query all the users from the store that have the same pantry as the current user
    return this.store.query('user', {
      orderBy: 'pantry', equalTo: this.get('user.pantry.id')
    }).then((allUsers) => {
      //Remove the current user from the list, since we don't want to show them with the other users.
      const otherUsers = allUsers.without(this.get('user'));
      return Ember.RSVP.hash({
        user: this.get('user'),
        users: otherUsers
      });
    });
  },


  actions: {
    testAction(){
      console.log("test");
      alert("WAT U WANT?!");
    }
  },


});

