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
		{
			"displayName": "Added By",
			"shortName": "Added By",
			"propertyName": "shoppingList.user.firstName",
			"sortableName":"shoppingList.user.firstName"
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


	smallWindowSize: Ember.computed('other', function () {
		console.log(window.innerWidth);
		// return this.get('other');
	}),

	actions:{

		sendActionUp(action, item){
			this.sendAction('sendActionUp', action, item);
		},

	}
});