import Ember from 'ember';

export default Ember.Component.extend({
	showPaymentDialog:false,

	actions:{
		showPaymentDialog(){
			this.set('showPaymentDialog', true);
		},

		makePayment(){
		},

		closePaymentDialog(action, paymentAmount){
			this.set('showPaymentDialog', false);
			if (action === 'makePayment') {
				console.log("you want to pay", this.get('user'));
				this.sendAction('makePayment', this.get('user'), paymentAmount);
			}
		}
	}
});
