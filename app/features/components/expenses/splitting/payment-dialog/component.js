import Ember from 'ember';

export default Ember.Component.extend({
	paymentAmount: 0,

	actions:{
		makePayment(){
			console.log("you want to pay", this.get('user').get('firstName'));
			this.set('showPaymentDialog', true);
		},

		closePaymentDialog(action){
			console.log(action);
			this.sendAction('closePaymentDialog', action, this.get('paymentAmount'));
		},

		getPaymentAmount(){
			console.log(this.get('paymentAmount'));
		}
	}
});
