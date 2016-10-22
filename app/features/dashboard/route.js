import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var userEmail = this.get('session').get('currentUser.email');

    //find the user based of their email and then return the model related to them
    return this.store.query('user', {
      orderBy: 'email', equalTo: userEmail
    }).then((allUsers) => {
      return allUsers.objectAt(0);
    });

  }
});
