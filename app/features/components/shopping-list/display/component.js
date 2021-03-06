import Ember from 'ember';

export default Ember.Component.extend({

	numberOfItemsToDisplay: Ember.computed('other', function () {
		if(this.get('limit')){
			console.log(window.innerHeight / 50 - 10);
			return parseInt(window.innerHeight / 50 - 7);
		}

		else{
			return false;
		}
	}),

	actions: {
		sendActionUp(action, item){
			this.sendAction(action, item);
		},

	},


});
