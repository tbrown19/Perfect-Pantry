import Ember from 'ember';

export default Ember.Service.extend({
	session: Ember.inject.service('session'),
	store: Ember.inject.service(),
	userAuth: Ember.inject.service('services/user-auth'),

	userEmail: Ember.computed('userEmail', function () {
		return this.get('session').get('currentUser.email');
	}),


	user: Ember.computed('user', function () {
		return this.get('store').query('user', {
			orderBy: 'email', equalTo: this.get('userEmail')
		}).then((allUsers) => {
			return allUsers.objectAt(0);
		});
	})

});
