import Ember from 'ember';

export default Ember.Component.extend({
	graphColors: Ember.inject.service('theme-helper'),
	graphOperations: Ember.inject.service('graph-operations'),
	chartData: [],
	chartLabels: [],
	timePeriodBasic: ["last", "month", "week"], //length, span, step

	timePeriod: Ember.computed('timePeriodBasic', function () {
		return this.get('timePeriodBasic');
	}),

	backgroundColors: Ember.computed('backgroundColorsArray', function () {
		return this.get('graphColors').get('backgroundColorsArray');
	}),

	borderColors: Ember.computed('borderColors', function () {
		return this.get('graphColors').get('borderColorsArray');
	}),

	chartHead: Ember.computed('timePeriodBasic', function () {
		const timePeriod = this.get('timePeriodBasic');
		return "Your spending " + timePeriod[0] + " " + timePeriod[1];
	}),

	chartLabel: Ember.computed('chartLabel', function () {
		return "Total Pantry Spending";
	}),

  //This chart is a pie graph that shows all the user's expenses relative to each other.
  resolveChartData: Ember.computed('timePeriod', function () {
    let user = this.get('user');
    this.get('graphOperations').generateFormattedUserExpenses(user, ['3','month','month']).then((results) => {
      this.set('chartLabels', results.labels);
      this.set('chartData', results.spendingAmounts);
    });


  }),


  graphOptions: Ember.computed('resolveChartData', function () {
    return {
      animation: true,
      labels: this.get('chartLabels'),
      indexLabelFontSize: 16,
      datasets: [{
        label: "Week of",
        data: this.get('chartData'),
        backgroundColor: this.get('backgroundColors')[6],
        borderColor: this.get('borderColors')[6],
        borderWidth: 1,
        lineTension: 0,
        capBezierPoints: true,
      }],
    };
  }),

  CHARTOPTIONS: Ember.computed('data', function () {
    return {
			legend: {
				onClick: "" //Prevent the clicking of the label from doing anything, since right now it's useless to allow it.
			},
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },

    };
  }),

	actions: {
		showOptions(){
			this.set('showDialog', true);
		},
		updateGraphTimeOptions(timeOptions){
			this.set('chartData', []);
			this.set('timePeriodBasic', [timeOptions[0], timeOptions[1], timeOptions[2]]);

		}
	}

});
