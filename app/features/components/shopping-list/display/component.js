import Ember from 'ember';

export default Ember.Component.extend({

  //What buttons to display when all items have been selected.
	allSelectedActionButtons:[
    {
      "type":"success",
      "icon":"glyphicon glyphicon-plus",
      "text":"Purchase All"
    },

		{
			"type":"danger",
			"icon":"glyphicon glyphicon-trash",
			"text":"Delete All"
		},
  ],

// {{#bs-button class="delete-button" type="default"}}
// Delete
// {{/bs-button}}

  tableRowActions:[
		{
			"class": "purchase-button",
			"text": "Purchase",
			"action": "purchaseItem"
		},

		{
			"class": "delete-button",
			"text": "Delete",
			"action": "deleteItem"
		}

  ],

  tableRowActionHeaders: [
    'money',
    'trash-o'
  ],

  actions: {
		sendActionUp(action, item){
    	console.log(action, item);
			this.sendAction(action, item);
		},

  },


});
