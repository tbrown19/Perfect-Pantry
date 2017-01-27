import Ember from 'ember';

export default Ember.Component.extend({

	//model = rowData

	isActive: true,

	//What name to show in the column headers.
	colDisplayNames: ['Qty', 'Name', 'Date Added', 'Price'],

	//What property to display within that column.
	colPropertyNames: ['quantity', 'name', 'formattedDate'],

	//Might have to add another array property like what to actual sort on, for example date vs formatted date.
	colSortPropertyNames: ['quantity', 'name', 'addedDate'],

	//What data is actually going to be displayed in each row.
	rowData: [],

	//Current property being sorted on, and the order in which it's being sorted.
	sortProperty: "",

	reverseSort: true,
	sortIcon: 'glyphicon glyphicon-menu-down',

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


	checkAllIsChecked: false,
	changeIncheckAll: Ember.observer('checkAllIsChecked', function () {
		if (this.get('checkAllIsChecked')) {
			$('#check-all-content').collapse('show');
		} else {
			$('#check-all-content').collapse('hide');
		}

	}),


	actions: {
		sortBy(element, sortParamIndex){
			this.set('sortIndex', sortParamIndex);


			const sortProperty = this.get('colSortPropertyNames')[sortParamIndex];

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
		}
	}


});
