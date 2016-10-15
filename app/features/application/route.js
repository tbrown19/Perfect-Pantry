import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  beforeModel: function() {
    return this.get('session').fetch().then(()=> {
      debugger;
      console.log('session fetched');
      //Get the the url the user is coming from
      //This is needed so if the user refreshes it redirects them back the page they were on.
      var url = window.location.href;
      var split_url = url.split("/");
      var redirect = split_url[split_url.length - 1] || "dashboard";
      //Get just the end item which is the current page
      this.transitionTo(redirect);

    }, function() {
      console.log('no session to fetch');
    });
  },

  actions: {
    signOut() {
      this.get("session").close();
      this.transitionTo('/');
    },
    accessDenied: function() {
      this.transitionTo('/');
    }
  }

});
