import Ember from 'ember';


export default Ember.Component.extend({
	//isChecked: this.get('checkAll'),
	isChecked: false,

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



	changeInIsCheckedComputed: Ember.observer('isCheckedComputed', function() {
		// deal with the change
		console.log(`you checked ${this.get('shoppingItem.name')}`);
		this.sendAction('itemChecked', this.get('shoppingItem'));

	}),

	actions: {

		purchaseItem(){
			this.sendAction('purchaseItem', this.get('shoppingItem'));
		},

		deleteItem(){
			this.sendAction('deleteItem', this.get('shoppingItem'));
		}



	},

});

