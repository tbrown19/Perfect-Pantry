import Ember from 'ember';

export default Ember.Component.extend({




	//model = rowData
	checkedItems: [],

	allText: "",

	colHeaderNames: Ember.computed('columnInformation', function () {
		return this.get('columnInformation').map((column) => {
			console.log(column);
			const mapProperty = this.get('shortNames')  ? 'shortName' : 'displayName';
			return column[mapProperty];
		});
	}),

	colPropertyNames: Ember.computed('columnInformation', function () {
		//We map the property names to an array so that the row function knows what to display
		return this.get('columnInformation').map((column) => {
			return column.propertyName;
		});
	}),

	reverseSort: true, //default sort is reversed, so that most recent items are first.
	sortIcon: 'glyphicon glyphicon-menu-down', //default sort icon is down

	sortBy: 'addedDate', // default sort by date items were added to the list
	sortIndex: 2,

	//We determine here what we are sorting on, and the order in which we are sorting it.
	sortDefinition: Ember.computed('sortBy', 'reverseSort', function () {
		//Default is false so we sort in ascending order
		let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
		return [`${this.get('sortBy')}:${sortOrder}`];
	}),


	//This is where we simply sort all the items, we get sorted definition from the computed property.
	rowDataSorted: Ember.computed.sort('rowData', 'sortDefinition'),

	rowDataSortedLimited: Ember.computed('rowDataSorted', function () {
		//We either use the limit, or just get all items by getting the length of the array and slicing up to it.
		const limit = this.get('limit') || this.get('rowDataSorted').length;
		return this.get('rowDataSorted').slice(0, limit);

	}),

	checkAllIsChecked: false,

	changeIncheckAll: Ember.observer('checkAllIsChecked', function () {
		if (this.get('checkAllIsChecked')) {
			this.set('allText', 'All');
			$('#check-all-content').collapse('show');
		} else {
			this.set('allText', '');
			$('#check-all-content').collapse('hide');
		}
	}),


	displayCheckBoxes: Ember.computed('displayCheckBoxes', function () {
		return true;
	}),


	actions: {
		itemChecked(item){
			const content = $('#check-all-content');
			//Start off by showing the buttons, if we need to hide them we will in the next step.
			content.collapse('show');

			if (!this.get('checkedItems').includes(item)) {
				this.get('checkedItems').addObject(item);
			}
			else {
				this.get('checkedItems').removeObject(item);
				//If we have 0 items checked, then we want to call our un-check all items function so that everything can be updated.
				if(this.get('checkedItems').length === 0){
					content.collapse('hide');
				}
			}

		},

		sortBy(sortParamIndex){
			this.set('sortIndex', sortParamIndex);

			const sortProperty = this.get('columnInformation')[sortParamIndex].sortableName;

			if (this.get('sortBy') === sortProperty) {
				this.set('reverseSort', !this.get('reverseSort'));
				console.log("sorting by:" + this.get('sortBy'));

				if (this.get('sortIcon') === 'glyphicon glyphicon-menu-up') {
					this.set('sortIcon', 'glyphicon glyphicon-menu-down');
				}
				else{
					this.set('sortIcon', 'glyphicon glyphicon-menu-up');
				}

			}
			else {
				this.set('sortBy', sortProperty);
			}
		},

		sendActionUp(action, item){
			this.sendAction('sendActionUp', action, item);
		},

	},


});
