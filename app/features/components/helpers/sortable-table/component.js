import Ember from 'ember';

export default Ember.Component.extend({
	//What name to show in the column headers.
	colDisplayNames: ['Qty','Name','Date Added', 'Price'],

	colDisplayNamesWithToggles: Ember.computed('colDisplayNames', function () {
		let cols = this.get('colDisplayNames');
		console.log(cols);
		//cols.unshift();
		console.log(cols);
		return cols;
	}),

	//What property to display within that column.
	columnPropertyNames: ['quantity','name','formattedDate'],

	//Might have to add another array property like what to actual sort on, for example date vs formatted date.

	//What data is actually going to be displayed in each row.
	rowData: [],

	//Current property being sorted on, and the order in which it's being sorted.
	sortProperty: "",

	sortOrder: "",


	checkAllIsChecked: false,


});
