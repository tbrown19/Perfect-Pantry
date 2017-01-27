import Ember from 'ember';

export default Ember.Component.extend({
	tagName: "tr",

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
});
