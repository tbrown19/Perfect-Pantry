import Ember from 'ember';

export default Ember.Component.extend({
	currentIcon: "keyboard arrow up",


	numShoppingListItems: Ember.computed('items', function () {
		return this.get('items').toArray().length;
	}),


	actions: {
		collapseButton(){
			console.log("you clicked it.");
			if( this.get('currentIcon') === "keyboard arrow up"){
				this.set('currentIcon', "keyboard arrow down");
			}
			else{
				this.set('currentIcon', "keyboard arrow up");
			}
		},
	}
});
