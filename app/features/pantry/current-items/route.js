import Ember from 'ember';

export default Ember.Route.extend({

	model: function () {
		return this.modelFor('pantry');
	},

	actions: {
		deleteItem(item){
			item.destroyRecord(false);
		},

		consumeItem(item){
			console.log(item);
			item.set('consumed', true);
			item.save();
			console.log(item.get('consumed'));
			console.log("hi??");
		},
	}

});
