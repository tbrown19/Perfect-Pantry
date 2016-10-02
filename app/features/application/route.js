import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {

    return this.get('session').fetch().catch(function() {});
  },

  redirect() {
    if (!this.get('session').get('isAuthenticated')) {
      this.transitionTo('sign-in');
    }
  }
});
