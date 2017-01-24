import Ember from 'ember';
import FirebaseAdapter from 'emberfire/adapters/firebase';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  authed: false,
  landingPage: false,
	firebase: Ember.inject.service(),

  beforeModel: function () {
    console.log("are we in this crap");
    return this.get('session').fetch().then(() => {
      //Get the the url the user is coming from
      //This is needed so if the user refreshes it redirects them back the page they were on.
      const url = window.location.href;
      const split_url = url.split("/");
      let redirect;

      if (split_url.length > 4) {
        //redirect = split_url[split_url.length - 2] + "/" + split_url[split_url.length - 1];
      }
      else {
        redirect = split_url[split_url.length - 1] || "dashboard";

      }

      //Get just the end item which is the current pageas
      this.set('authed', true);
      this.transitionTo(redirect);

    }, function () {
      console.log('no session to fetch');
    });
  },

  model: function () {
    //Make sure the user is authenticated before we attempt to return the model
    if (this.get('session').get('isAuthenticated')) {
      console.log("are we here?");
      const userEmail = this.get('session').get('currentUser.email');

      //find the user based of their email and then return the model related to them
      return this.store.query('user', {
        orderBy: 'email', equalTo: userEmail
      }).then((allUsers) => {
        const user = allUsers.objectAt(0);
        const pantry = user.get('pantry');
        return Ember.RSVP.hash({
          user: user,
          pantry: pantry,
          pantryUsers: pantry.get('users'),
          shoppingList: user.get('shoppingList'),
          purchasedList: user.get('purchasedList')
        });
      });
    }
    else{
			this.set('landingPage', true);
			console.log("test");
		}

  },

  actions: {

    signOut() {
			return this.get("session").close().then(() => {
				this.transitionTo('index');
			});

    },

    accessDenied: function () {
      return this.transitionTo('index');
    },


  }

});
