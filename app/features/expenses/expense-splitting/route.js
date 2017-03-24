import Ember from 'ember';
import moment from 'moment';
export default Ember.Route.extend({

	model(){
		// 	user: user,
		// 	purchasedList: application.purchasedList,
		// 	allUsers: allUsers,
		// 	otherUsers: allUsers.without(user),
		// 	pantry: pantry
		return this.modelFor('expenses');
	},


	actions:{
		makePayment(otherUser, paymentAmount){
			console.log("you are", this.currentModel.user.get('firstName'));
			console.log("you want to pay", otherUser.get('firstName'));


			const newPayment = this.get('store').createRecord('user-to-user-payment', {
				sender: this.currentModel.user,
				receiver: otherUser,
				paymentAmount: paymentAmount,
				paymentDate: moment(),
			});
			console.log(newPayment);

			otherUser.get('paymentsFromOthers').pushObject(newPayment);
			this.currentModel.user.get('paymentsToOthers').pushObject(newPayment);
			newPayment.save().then(() => {
				otherUser.save();
				this.currentModel.user.save();
			}); 
		}
	},

});
