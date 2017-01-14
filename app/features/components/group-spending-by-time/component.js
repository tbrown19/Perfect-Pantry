import Ember from 'ember';

export default Ember.Component.extend({
  graphColors: Ember.inject.service('theme-helper'),
  graphOperations: Ember.inject.service('graph-operations'),
  chartData: [],
  chartLabels:  [],


  backgroundColors: Ember.computed('backgroundColorsArray', function () {
    return this.get('graphColors').get('backgroundColorsArray');
  }),

  borderColors: Ember.computed('borderColors', function () {
    return this.get('graphColors').get('borderColorsArray');
  }),

  chartLabel: Ember.computed('chartLabel', function () {
    //For consistency sake this is a computed property, but doesn't actually have to be as of right now.
    return "Total Pantry spending breakdown by time";
  }),


  //This chart is a pie graph that shows all the user's expenses relative to each other.
  resolveChartData: Ember.computed('resolveChartData', function () {
    const users = this.get('allUsers');
    //We need an array of the promises, while we wait for them to resolve
    let promises = [];
    //Then we need an array of labels and data which we eventually use to create the graph.
    let labels = [];
    let data = [];
    const numUsers = users.toArray().length;

    //this.get('graphOperations').generateLabelsForTimePeriod([1,'week']);

  }),


  graphOptions: Ember.computed('data', function () {
    return {
      animation : true,
      labels: this.get('chartLabels'),
      indexLabelFontSize: 16,
      datasets: [{
        label: this.get('chartLabel'),
        data: this.get('chartData'),
        backgroundColor: this.get('backgroundColors'),
        borderColor: this.get('borderColors'),
        borderWidth: 1
      }]
    }
  }),

});
