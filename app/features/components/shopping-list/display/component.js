import Ember from 'ember';

export default Ember.Component.extend({

  //What buttons to display when all items have been selected.


  actions: {
		sendActionUp(action, item){
    	console.log(action, item);
    	console.log("wat");
			this.sendAction(action, item);
		},

  },


});
