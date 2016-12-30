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
      console.log(url);
      const split_url = url.split("/");
      console.log(split_url);
      let redirect;

      if(split_url.length > 4){
        //redirect = split_url[split_url.length - 2] + "/" + split_url[split_url.length - 1];
      }
      else{
        redirect = split_url[split_url.length - 1] || "dashboard";

      }
      console.log(redirect);

      //Get just the end item which is the current pageas
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
    },
    testAction(){
      console.log("test");
      alert("WAT U WANT?!");
    }


  }

});
