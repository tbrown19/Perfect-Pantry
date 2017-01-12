import Ember from 'ember';

export default Ember.Component.extend({
  pantryEmail:"",

  actions:{
    sendPantryRequest(email){
      console.log(email);
    }
  }
});
