import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    console.log(this.store.findAll('user'));
    return this.store.findAll('user');
  }
});
