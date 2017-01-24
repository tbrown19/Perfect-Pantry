import Ember from 'ember';

export default Ember.Component.extend({
	userEmail: "",
	userFirstName: "",
	userLastName: "",
	userPassword: "",

	actions:{
		signUpRequest(){
			this.sendAction("signUpRequest",this.get("userEmail"), this.get("userFirstName"),
				this.get("userLastName"),this.get("userPassword"));
		}
	},

	//Regex to handle some basic email validation.
	emailValidation: [{
		message: 'Please provide email in a valid format',
		validate: (inputValue) => {
			let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			return emailPattern.test(inputValue);
		}
	}],

});
