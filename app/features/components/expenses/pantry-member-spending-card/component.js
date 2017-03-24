import Ember from 'ember';

export default Ember.Component.extend({
	graphOperations: Ember.inject.service('graph-operations'),
	userSpendingAllTime:'',

	userSpendingAllTimeComp: Ember.computed('userSpendingAllTime', function () {
		//Call the function that will update the user's spending.
		//We then return user spending. Since user spending isn't set to anything at first we are setting it to that,
		//However once the other function finishes, user spending will automatically update and then the comp property will
		//As well. That's why we have the if function, so we don't call user spending more than we need too.
		if(this.get('userSpendingAllTime') === ''){
			this.getUserSpendingAllTime();
		}
		return this.get('userSpendingAllTime');
	}),

	getUserSpendingAllTime(){
		return this.get('user').get('purchasedList').then((purchasedList) => {
			return this.get('graphOperations').sumAllTimeUserExpenses(this.get('user'), purchasedList).then((results) => {
				this.set('userSpendingAllTime', results[1]);
				return results[1];
			});
		});

	},
});
