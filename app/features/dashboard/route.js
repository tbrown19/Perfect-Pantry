import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    const user = this.modelFor('application');
    return this.store.query('shoppingListItem', {
      orderBy: 'pantry', equalTo: user.get('pantry.id')
    }).then((shoppingItems) => {
      //Remove the current user from the list, since we don't want to show them with the other users.
      return Ember.RSVP.hash({
        user: this.get('user'),
        shoppingItems: shoppingItems
        //users: otherUsers
      });
    });
  }
});
