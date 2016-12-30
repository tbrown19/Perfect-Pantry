import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    testAction(){
      console.log("test");
      alert("WAT U WANT?!");
    }
  }
});
