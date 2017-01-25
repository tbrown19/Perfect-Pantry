import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),

	actions:{
		signOut(){
			//Closing the session here makes sure it is closed before performing the actions in the app route.
			this.get("session").close();
			this.sendAction('signOut');
		}
	}
});
