import Ember from 'ember';

export default Ember.Component.extend({

	timeLengthOptions: ['1', '2'],

	timeLength: Ember.computed('timeLength', function () {
		return "This";
	}),

	timePeriod: Ember.computed('timePeriod', function () {
		return "";
	}),

	timeStep: Ember.computed('timeStep', function () {
		return "day";
	}),


	changeInTimePeriod: Ember.observer('timePeriod', function () {
		if(this.get('timePeriod') !== null){
			document.getElementById("secondary-options").style.visibility = "visible";
		}
		else{
			document.getElementById("secondary-options").style.visibility = "hidden";
		}
		this.updateTimeLengthOptions();

	}),

	changeInTimeLength: Ember.observer('timeLength', function () {
		const timeLength = this.get('timeLength');
		console.log("hmmmm" + this.get('timeStep'));
		if(timeLength !== null){
			this.sendAction('enableOKButton', true, [this.get('timeLength'), this.get('timePeriod'), this.get('timeStep')]);
		}
		else{
			this.sendAction('enableOKButton', false);
		}
	}),


	updateTimeLengthOptions(){
		const timePeriod = this.get('timePeriod');
		console.log(timePeriod);
		if(timePeriod === 'week'){
			//Show the secondary row in order to display the other options.
			document.getElementById("secondRow").style.visibility = "visible";
			this.set('timeLengthOptions', ['1', '2']);
			this.set('timeStep', "day");
		}
		else if(timePeriod === 'month'){
			document.getElementById("secondRow").style.visibility = "visible";
			this.set('timeLengthOptions', ['1', '3', '6']);
			console.log("set to week?");
			this.set('timeStep', "week");

		}
		else{
			//Hide the second row and set the options back to default, since a time period of a year doesn't need those options.
			document.getElementById("secondRow").style.visibility = "hidden";
			//Set it to 10 and 20, that way it maintains similiar length, but won't auto select a value.
			this.set('timeLengthOptions', ['10', '20']);
			this.set('timeLength', 'This');
		}
	},

});