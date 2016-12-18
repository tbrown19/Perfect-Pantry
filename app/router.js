import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-up');
  this.route('sign-in');
  this.authenticatedRoute('dashboard');
  //this.authenticatedRoute('pantry');
  this.authenticatedRoute('shopping-list');
  this.authenticatedRoute('expenses');

  this.route('pantry', function() {
    this.route('index', {path: '/'});
    this.route('settings', { path: '/settings' }, function(){
      this.route('index', {path: '/'});
    });
    this.route('view');
  });
});

export default Router;
