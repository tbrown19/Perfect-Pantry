import Ember from 'ember';

export default Ember.Component.extend({
	itemName: "",

	actions: {
		getItemName(){
			event.preventDefault();
			this.sendAction('getItemName', this.get('itemName'));
		},
	},



});
