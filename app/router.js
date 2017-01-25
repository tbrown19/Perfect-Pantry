import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-up');
  this.route('sign-in');
	this.route('landing-page', { path: '/' });

  this.authenticatedRoute('dashboard');
  //this.authenticatedRoute('pantry');
  this.authenticatedRoute('shopping-list');
  this.authenticatedRoute('expenses');

  this.authenticatedRoute('pantry', function() {
    this.authenticatedRoute('settings');
    this.authenticatedRoute('group-shopping-list');
    this.authenticatedRoute('current-items');
  });

  this.authenticatedRoute('expenses', function() {
    this.authenticatedRoute('expense-splitting');
    this.authenticatedRoute('visualizations');
    this.authenticatedRoute('overview');
  });

});

export default Router;
