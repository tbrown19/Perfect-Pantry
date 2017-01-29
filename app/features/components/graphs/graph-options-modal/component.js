import Ember from 'ember';

export default Ember.Component.extend({
	//showDialog:true,
	okButtonDisabled: false,
	timeOptions:[],

	actions: {
		updateGraphTimeOptions(buttonClicked){

			this.set('showDialog', false);
			if(buttonClicked === "ok"){
				this.sendAction('updateGraphTimeOptions', this.get('timeOptions'));
			}

		},

		enableOKButton(valueForButton, timeOptions){
			//console.log(value);
			//We set it to the opposite because we want to be able to send true, enable button, but we want disabled to then be false.
			this.set('okButtonDisabled', !valueForButton);
			this.set('timeOptions', timeOptions);

		},



	},


});
