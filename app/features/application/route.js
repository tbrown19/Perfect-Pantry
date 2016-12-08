import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  authed: false,

  beforeModel: function() {
    return this.get('session').fetch().then(()=> {
      console.log('session fetched');
      //Get the the url the user is coming from
      //This is needed so if the user refreshes it redirects them back the page they were on.
      const url = window.location.href;
      const split_url = url.split("/");
      const redirect = split_url[split_url.length - 1] || "dashboard";
      //Get just the end item which is the current page
      this.set('authed',true);
      this.transitionTo(redirect);

    }, function() {
      //this.set('authed',false);
      console.log('no session to fetch');
    });
  },

  model: function () {
    //Make sure the user is authenticated before we attempt to return the model
    if(this.get('authed')){
      const userEmail = this.get('session').get('currentUser.email');

      //find the user based of their email and then return the model related to them
      return this.store.query('user', {
        orderBy: 'email', equalTo: userEmail
      }).then((allUsers) => {
        console.log("heres your user");
        return allUsers.objectAt(0);
      });
    }

  },

  actions: {
    signOut() {
      this.get("session").close();
      this.transitionTo('/');
    },
    accessDenied: function() {
      return this.transitionTo('/');
    }
  }

});
