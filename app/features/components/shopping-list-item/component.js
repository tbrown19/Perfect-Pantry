import Ember from 'ember';

export default Ember.Component.extend({
  isChecked: false,

  actions: {
    selectItem(item) {
      this.set('isChecked', !this.get('isChecked'));
      this.sendAction('selectItem',item);
      // do all the other things
    }
  }
});

