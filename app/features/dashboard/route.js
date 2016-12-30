import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({

  model() {
    const user = this.modelFor('application');
    const pantry = user.get('pantry');


    //console.log(this.modelFor('application'));
    return Ember.RSVP.hash({
      user: this.get('user'),
      items: pantry.get('shoppingItems')
      //users: otherUsers
    });
  }
});
