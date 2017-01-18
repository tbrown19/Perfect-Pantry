import Ember from 'ember';

export default Ember.Component.extend({
  graphColors: Ember.inject.service('theme-helper'),
  graphOperations: Ember.inject.service('graph-operations'),
  chartData: [],
  chartLabels: [],


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
    let timePeriod = ["1", "month", "week"];

    this.get('graphOperations').generateAllUsersFormattedExpenses(this.get('user').get('pantry'), timePeriod).then((results) => {
      this.set('chartLabels', results[0]);
      this.set('chartData', results[1])
    });


  }),


  graphOptions: Ember.computed('data', function () {
    return {
      animation: true,
      labels: this.get('chartLabels'),
      indexLabelFontSize: 16,
      datasets: [{
        label: this.get('chartLabel'),
        data: this.get('chartData'),
        backgroundColor: this.get('backgroundColors')[3],
        borderColor: this.get('borderColors')[3],
        borderWidth: 1,
        lineTension: 0,
        capBezierPoints: true,
      }],
    }
  }),

  CHARTOPTIONS: Ember.computed('data', function () {
    return {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  }),

});
