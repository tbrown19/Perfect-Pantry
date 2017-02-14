import Ember from 'ember';

export default Ember.Component.extend({
	tagName: "tr",
	classNameBindings: ['hoverBackground'],
	hoverBackground: false,


	//isChecked: this.get('checkAll'),
	isChecked: false,

	rowItemComp: Ember.computed('rowItem', function () {
		return this.get('rowItem');

	}),



	changeInIsChecked: Ember.observer('isChecked', function() {
		this.sendAction('itemChecked', this);
		//If the item is checked then we display the hover background color.
		this.set('hoverBackground', this.get('isChecked'));

		console.log(`you checked ${this.get('rowItem.name')}`);
	}),


	isCheckedComputed: Ember.computed('isChecked', function() {
		return this.get('checkAll') || this.get('isChecked');
	}),


	actions: {
		sendActionUp(action, item){
			this.sendAction('sendActionUp', action, item);
		},

		deleteItem(item){
			this.sendAction('deleteItem', item);
		},

	}

});
