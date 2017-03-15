import Ember from 'ember';

export default Ember.Component.extend({
	showPaymentDialog:false,

	actions:{
		makePayment(){
			console.log("you want to pay", this.get('user').get('firstName'));
			this.set('showPaymentDialog', true);
		},

		closeDialogWithParent(){
			this.set('showPaymentDialog', false);
		}
	}
});
