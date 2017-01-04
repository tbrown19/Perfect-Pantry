import Ember from 'ember';

export default Ember.Component.extend({
  isChecked: false,


  changeInIsChecked: Ember.observer('isChecked', function() {
    // deal with the change
    console.log(`you checked ${this.get('shoppingItem.name')}`);
    this.sendAction('itemChecked', this.get('shoppingItem'));

  }),


});

