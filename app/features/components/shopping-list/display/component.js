import Ember from 'ember';

export default Ember.Component.extend({
	

  actions: {
		sendActionUp(action, item){
			this.sendAction(action, item);
		},

  },


});
