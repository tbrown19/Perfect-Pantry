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
    this.route('settings');
    this.route('group-shopping-list');
    this.route('current-items');
  });

  this.route('expenses', function() {
    this.route('expense-splitting');
    this.route('visualizations');
    this.route('overview');
  });
  this.route('landing-page');
});

export default Router;
