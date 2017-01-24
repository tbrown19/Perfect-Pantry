import Ember from 'ember';

export default Ember.Component.extend({
	userEmail: "",
	userPassword: "",

	actions:{
		signInRequest(){
			this.sendAction("signInRequest",this.get("userEmail"),this.get("userPassword"));
		}
	},
});
