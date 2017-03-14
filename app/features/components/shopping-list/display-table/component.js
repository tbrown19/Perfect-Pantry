import Ember from 'ember';

export default Ember.Component.extend({
	columnInformation: [
		{
			"displayName": "Qty",
			"shortName": "Qty",
			"propertyName": "quantity",
			"sortableName":"quantity"
		},
		{
			"displayName": "Name",
			"shortName": "Name",
			"propertyName": "name",
			"sortableName":"name"
		},
		{
			"displayName": "Date Added",
			"shortName": "Date",
			"propertyName": "formattedDate",
			"sortableName":"addedDate"
		},
	],

	allSelectedActionButtons:[
		{
			"type":"success",
			"icon":"glyphicon glyphicon-plus",
			"text":"Purchase"
		},

		{
			"type":"danger",
			"icon":"glyphicon glyphicon-trash",
			"text":"Delete"
		},
	],

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


	dashboardTableRowHeaders: [
		'money'
	],

	dashboardTableRowActions:[
		{
			"class": "purchase-button",
			"text": "Purchase",
			"action": "purchaseItem"
		},

	],

	actions:{

		sendActionUp(action, item){
			this.sendAction('sendActionUp', action, item);
		},

	}
});