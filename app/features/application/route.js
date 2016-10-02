import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (this.get('session').get('isAuthenticated')) {
      return; // Already authenticated
    }
  }
});
