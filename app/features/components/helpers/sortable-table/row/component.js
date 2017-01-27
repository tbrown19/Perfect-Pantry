import Ember from 'ember';

export default Ember.Component.extend({
	tagName: "tr",
	classNameBindings: ['hoverBackground'],
	hoverBackground: false,


	//isChecked: this.get('checkAll'),
	isChecked: false,


	changeInIsChecked: Ember.observer('isChecked', function() {
		//If the item is checked then we display the hover background color.
		this.set('hoverBackground', this.get('isChecked'));

		console.log(`you checked ${this.get('rowItem.name')}`);
		this.sendAction('itemChecked', this.get('shoppingItem'));
	}),


	isCheckedComputed: Ember.computed('isChecked', function() {
		//If checkAll is true then we return true since we want it checked, otherwise we return based on what is checked is
		return this.get('checkAll') || this.get('isChecked');

	}),
});
