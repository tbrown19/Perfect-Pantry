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
		if(timePeriod[0] === 'last' || timePeriod[0] === 'this'){
			return "Pantry spending " + timePeriod[0] + " " + timePeriod[1] + " by " + timePeriod[2];
		}
		else if(timePeriod[1] === 1){
			return "Pantry spending over the last " + timePeriod[0] + " " + timePeriod[1] + " by " + timePeriod[2];
		}
		else{
			return "Pantry spending over the last " + timePeriod[0] + " " + timePeriod[1] + "s by " + timePeriod[2];
		}
  }),

  chartLabel: Ember.computed('chartLabel', function () {
    return "Total Pantry Spending";
  }),


  //This chart is a pie graph that shows all the user's expenses relative to each other.
	resolveChartData: Ember.computed('timePeriod', function () {

    let timePeriod = this.get('timePeriod');
    this.get('graphOperations').generateAllUsersFormattedExpenses(this.get('user').get('pantry'), timePeriod).then((results) => {
      this.set('chartLabels', results[0]);
      this.set('chartData', results[1]);
    });

  }),




  graphOptions: Ember.computed('resolveChartData', function () {
  	//Get the chart data and wait for it to resolve, then
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
