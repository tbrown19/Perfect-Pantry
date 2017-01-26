import Ember from 'ember';

export default Ember.Component.extend({
  quantity: "",
  itemName: "",
  currentIcon: "keyboard arrow up",

  actions: {
    addNewItems(){
      //TODO add validation so that the user has to enter a quantity greater than one for an item

      console.log(this.get('quantity'), this.get('itemName'));

      this.sendAction('addItem',this.get('quantity'), this.get('itemName'));

      this.set('quantity', "");
      this.set('itemName', "");


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
