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
			"displayName": "Date Purchased",
			"shortName": "Date",
			"propertyName": "purchasedDateFormatted",
			"sortableName":"purchasedDate"
		},

	],

	extraColumnInformation: [
		{
			"displayName": "Purchased By",
			"shortName": "Purchased",
			"propertyName": "shoppingList.user",
			"sortableName":"shoppingList.user"
		},
	],

	allSelectedActionButtons:[
		{
			"type":"success",
			"icon":"glyphicon glyphicon-plus",
			"text":"Consume"
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
			"text": "Consume",
			"action": "consumeItem"
		},

		{
			"class": "delete-button",
			"text": "Delete",
			"action": "deleteItem"
		}

	],

	tableRowActionHeaders: [
		'cutlery',
		'trash-o'
	],


	dashboardTableRowHeaders: [
		'money'
	],

	dashboardTableRowActions:[
		{
			"class": "purchase-button",
			"text": "Consume",
			"action": "consumeItem"
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