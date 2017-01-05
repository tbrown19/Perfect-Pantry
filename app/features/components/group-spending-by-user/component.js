import Ember from 'ember';

export default Ember.Component.extend({
  graphColors: Ember.inject.service('theme-helper'),


  //We need to get all the users in the pantry in a nice format so we can use them to find the date and labels.
  pantryUsers: Ember.computed('backgroundColorsArray', function() {
    return this.get('graphColors').get('backgroundColorsArray');
  }),
  


  backgroundColors: Ember.computed('backgroundColorsArray', function() {
    return this.get('graphColors').get('backgroundColorsArray');
  }),

  borderColors: Ember.computed('borderColorsArray', function() {
    return this.get('graphColors').get('borderColorsArray');
  }),

  chartLabels: Ember.computed('chartLabels', function() {
    return this.get('graphColors').get('backgroundColorsArray');
  }),

  chartLabel: Ember.computed('chartLabel', function() {
    //For consistency sake this is a computed property, but doesn't actually have to be as of right now.
    return "Spending breakdown by user";
  }),

  chartData: Ember.computed('chartData', function() {
    return this.get('graphColors').get('backgroundColorsArray');
  }),



  graphOptions: Ember.computed('data', function() {
    return {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Green Sea", "Wet Asphalt",
        "idk", "dark red"],
      datasets: [{
        label: this.get('chartLabel'),
        data: [12, 19, 3, 5, 2, 3, 3, 10, 11, 7],
        backgroundColor: this.get('backgroundColors'),
        borderColor: this.get('borderColors'),
        borderWidth: 1
      }]
    };
  }),

});
