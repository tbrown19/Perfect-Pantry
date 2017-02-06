import Ember from 'ember';

export default Ember.Component.extend({
	graphOperations: Ember.inject.service('graph-operations'),
	userSpending:'',

	userSpendingComp: Ember.computed('userSpending', function () {
		//Call the function that will update the user's spending.
		//We then return user spending. Since user spending isn't set to anything at first we are setting it to that,
		//However once the other function finishes, user spending will automatically update and then the comp property will
		//As well. That's why we have the if funciton, so we don't call user spending more than we need too.
		if(this.get('userSpending') === ''){
			this.getUserSpending();
		}
		return this.get('userSpending');
	}),

	getUserSpending(){
		return this.get('graphOperations').sumAllTimeUserExpenses(this.get('user'), this.get('purchasedList')).then((results) => {
			this.set('userSpending', results[1]);
			return results[1];
		});
	}
});
