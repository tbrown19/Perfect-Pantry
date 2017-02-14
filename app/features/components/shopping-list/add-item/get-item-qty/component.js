import Ember from 'ember';

export default Ember.Component.extend({
	itemQty: 1,

	actions: {
		getItemQty(){
			event.preventDefault();
			this.sendAction('getItemQty', this.get('itemQty'));
		},

		goBack(){
			event.preventDefault();
			this.sendAction('goBack');
		}
	},

});