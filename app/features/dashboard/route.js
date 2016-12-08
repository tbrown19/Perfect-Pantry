import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    console.log(this.modelFor('application'));
    return this.modelFor('application');
  }
});
