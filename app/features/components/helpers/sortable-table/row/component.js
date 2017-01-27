import Ember from 'ember';

export default Ember.Component.extend({
	tagName: "tr",
	classNameBindings: ['hoverBackground'],
	hoverBackground: false,


	//isChecked: this.get('checkAll'),
	isChecked: false,


	changeInIsChecked: Ember.observer('isChecked', function() {
		//If the item is checked then we display the hover background color.
		if(this.get('isChecked')){
			this.set('hoverBackground', true);
		}
		else{
			this.set('hoverBackground', false);
		}
		console.log(`you checked ${this.get('shoppingItem.name')}`);
		this.sendAction('itemChecked', this.get('shoppingItem'));
	}),


	isCheckedComputed: Ember.computed('isChecked', function() {
		//Default is false so we sort in ascending order
		if(this.get('checkAll')){
			this.set('checkAll',false);
			this.set('isChecked', true);
			return true;
		}
		else{
			return this.get('isChecked');
		}
	}),
});
