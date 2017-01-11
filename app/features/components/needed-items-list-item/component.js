import Ember from 'ember';


export default Ember.Component.extend({
  //isChecked: this.get('checkAll'),
  isChecked: false,

  isCheckedComputed: Ember.computed('isChecked', function() {
    //Default is false so we sort in ascending order
    if(this.get('checkAll')){
      return true;
    }
    else{
      return this.get('isChecked');
    }
  }),


  changeInIsChecked: Ember.observer('isCheckedComputed', function() {
    // deal with the change
    console.log(`you checked ${this.get('shoppingItem.name')}`);
    this.sendAction('itemChecked', this.get('shoppingItem'));

  }),


  isAllChecked: Ember.computed('isAllChecked', function() {
    //Default is false so we sort in ascending order
    console.log(this.get('checkAll'));
    if(this.get('checkAll') == true){
      this.set('isChecked', true);
    }
  }),

});

