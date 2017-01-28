import Ember from 'ember';

export default Ember.Component.extend({
	itemQty: "",
  itemName: "",
  currentIcon: "keyboard arrow up",

	requestingItemName: true,
	requestingItemQty: false,


	actions: {

		getItemName(itemName){
    	this.set('itemName', itemName);
    	this.set('requestingItemQty', true);
			this.set('requestingItemName', false);
		},

		getItemQty(itemQty){
			this.set('itemQty', itemQty);
			this.set('requestingItemName', true);
			this.set('requestingItemQty', false);

			this.sendAction('addItem',this.get('itemQty'), this.get('itemName'));

		},

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
