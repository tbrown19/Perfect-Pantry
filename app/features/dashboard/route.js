import Ember from 'ember';

export default Ember.Route.extend({
  loading: true,

	beforeModel() {
		console.log("loading the model");
	},

  model() {
    const application = this.modelFor('application');
    const pantry = application.pantry;

    return Ember.RSVP.hash({
      user: application.user,
      shoppingItems: pantry.get('shoppingItems'),
      purchasedItems: pantry.get('purchasedItems')
    });

  },

	afterModel() {
    this.set('loading', false);
	},


	actions: {

	}

});
