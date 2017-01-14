import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({

  model(){
    const application = this.modelFor('application');
    const user = application.user;
    const pantry = application.pantry;


    return pantry.get('users').then((allUsers) => {
      return Ember.RSVP.hash({
        user: user,
        purchasedList: application.purchasedList,
        allUsers: allUsers,
        otherUsers: allUsers.without(user)
      });
    });

  },


  actions: {

  },


});

