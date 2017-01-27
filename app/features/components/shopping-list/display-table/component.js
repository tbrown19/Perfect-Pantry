import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		sortBy(sortParam){
			console.log(sortParam);
		}
	}
});