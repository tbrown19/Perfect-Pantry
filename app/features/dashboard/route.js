import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    const application = this.modelFor('application');
    const pantry = application.pantry;

    return Ember.RSVP.hash({
      user: application.user,
      shoppingItems: pantry.get('shoppingItems'),
      purchasedItems: pantry.get('purchasedItems')
    });

  }
});
