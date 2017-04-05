import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
	graphColors: Ember.inject.service('theme-helper'),
	spending: Ember.inject.service('services/spending-operations'),
	chartData: [],
	chartLabels: [],
	timePeriodBasic: ["last", "week", "day"], //length, span, step

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
			return "Your spending " + timePeriod[0] + " " + timePeriod[1] + " by " + timePeriod[2];
		}
		else if(timePeriod[1] === 1){
			return "Your spending over the last " + timePeriod[0] + " " + timePeriod[1] + " by " + timePeriod[2];
		}
		else{
			return "Your spending over the last " + timePeriod[0] + " " + timePeriod[1] + "s by " + timePeriod[2];
		}
	}),

	chartLabel: Ember.computed('chartLabel', function () {
		return "Total Pantry Spending";
	}),

	xAxisLabel: Ember.computed('timePeriodBasic', function () {
		return this.get('timePeriodBasic')[2] + " of";
	}),


  //This chart is a pie graph that shows all the user's expenses relative to each other.
  resolveChartData: Ember.computed('timePeriod', function () {
		//this.get('timePeriod')
		//["this","year","month"]
    let user = this.get('user');
    let timePeriod = this.get('timePeriod');
		this.get('spending').generateFormattedUserExpenses(user, timePeriod, true).then((results) => {
      this.set('chartLabels', results.labels);
      this.set('chartData', results.spendingAmounts);

		});

  }),


  graphOptions: Ember.computed('resolveChartData', function () {
    return {
      animation: true,
      labels: this.get('chartLabels'),
			xLabels: "Week of",
			indexLabelFontSize: 16,
      datasets: [{
      	xLabels: ["Week of"],
        label: "Your Spending",
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
          },
					scaleLabel: {
						display: true,
						labelString: 'Spending'
					}
        }],
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
