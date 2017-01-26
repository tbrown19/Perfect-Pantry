import Ember from 'ember';

export default Ember.Component.extend({


	actions : {
		//Handles the delete action dialog, including closing it and processing the user's choice.
		deleteDialogAction(param1){
			//Any action the user performs hides the menu so we make sure to hide it first.
			this.set('showingAreYouSureMenu', false);

			if (param1 === "ok") {
				console.log("so you want to delete some stuff.");
				//If they have nothing checked and they still want to delete, then we will delete all the items for them.
				if (this.get('checkAll')) {
					console.log("they have all items selected.");
				}
				else {
					this.get('checkedItems').forEach(function (item) {
						console.log(item.get('name'));
					});

				}
			}

		},
	}

});
