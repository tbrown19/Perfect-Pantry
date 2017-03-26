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

  chartHead: Ember.computed('chartLabel', function () {
    return "Total Pantry spending breakdown by user";
  }),

  chartLabel: Ember.computed('chartLabel', function () {
    return "Total Pantry spending breakdown by user";
  }),


  //This chart is a pie graph that shows all the user's expenses relative to each other.
  resolveChartData: Ember.computed('resolveChartData', function () {
    const users = this.get('allUsers');

    this.get('graphOperations').generateAllUsersAllTimeExpenses(users).then((results) => {
      this.set('chartLabels', results.nameLabels);
      this.set('chartData', results.spendingLabels);
    });

  }),


  graphOptions: Ember.computed('data', function () {
    console.log("derp");
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
    };
  }),

	actions: {
		showOptions(){
			this.set('showDialog', true);
		}
	}

});
