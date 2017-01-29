import Ember from 'ember';

export default Ember.Route.extend({

	model(){
		return this.modelFor('expenses');
	},

	actions: {
		closeDialogWithParent(buttonClicked){
			console.log(buttonClicked);
		}
	},
});
