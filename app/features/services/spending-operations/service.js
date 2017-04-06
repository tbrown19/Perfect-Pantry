import Ember from 'ember';
import _ from 'lodash';

export default Ember.Service.extend({
	time: Ember.inject.service('services/time-operations'),

	//TODO add method header - method is DONE
	getSingleUserItemsByDay(items, date){
		console.log(items, date);
		return items.filter(item => {
			return item.get('purchasedDate') === date;
		});
	},

	/**
	 * Sums the total cost of all the items in a purchasedList
	 * @return {Number} totalSpending
	 */
	sumAllSpendingFromList(purchasedList){
		return new Promise((resolve) => {
			purchasedList.get('purchasedListItems').then((purchasedItems) => {
				return purchasedItems.reduce((total, item) => total + item.get('price'), 0);
			}).then((totalSpending) => {
				resolve(totalSpending);
			});
		});
	},

	/**
	 * Sums an individual users all time spending.
	 * @param {user} user
	 * @return {Object} {"user":user, "spending":totalSpentAllTime}
	 */
	sumAllTimeUserSpending(user) {
		return new Promise((resolve) => {
			//We have to first get the users purchased list and resolve that promise
			user.get('purchasedList').then((purchasedList) => {
				//Then we can get the list of items they've purchased
				this.sumAllSpendingFromList(purchasedList).then((totalSpentAllTime) => {
					resolve({
						"user": user,
						"spending": totalSpentAllTime
					});
				});
			});
		});
	},

	//TODO add method header - method is DONE
	sumSingleDayUserExpenses(items, date){
		let itemsOnDay = this.getSingleUserItemsByDay(items, date);
		return itemsOnDay.reduce((total, item) => total + item.get('price'), 0);
	},

	sumTimePeriodByDay(items, timePeriod){
		//Generate the date objects, then pass them on to generate week objects.
		let dates = this.get('time').periodToBoundDates(timePeriod);
		let dayObjects = this.get('time').generateDayObjects(dates.startDate, dates.endDate);
		//Add the items to each day object as well as sum up the items costs.
		dayObjects = this.get('time').addItemsToDayObjects(items, dayObjects);
		return dayObjects;
	},

	sumTimePeriodByWeek(items, timePeriod){
		//Generate the date objects, then pass them on to generate week objects.
		let dates = this.get('time').periodToBoundDates(timePeriod);
		let weekObjects = this.get('time').generateWeekObjects(dates.startDate, dates.endDate);
		//Add the items to each week object as well as sum up the items costs.
		weekObjects = this.get('time').addItemsToTimePeriodObjects(items, weekObjects);
		return weekObjects;
	},

	sumTimePeriodByMonth(items, timePeriod){
		//Generate the date objects, then pass them on to generate week objects.
		let dates = this.get('time').periodToBoundDates(timePeriod);
		let monthObjects = this.get('time').generateMonthObjects(dates.startDate, dates.endDate);
		//Add the items to each week object as well as sum up the items costs.
		monthObjects = this.get('time').addItemsToTimePeriodObjects(items, monthObjects);
		console.log(monthObjects);

		return monthObjects;
	},

	//TODO add method header - method is NOT DONE - needs to be rewritten like sumTimePeriodAllUsersExpenses
	sumTimePeriodExpenses(items, timePeriod, forGraphing){
		let step = timePeriod[2].toLowerCase();
		let timePeriodObjects;
		let dateType = "startDate";
		//Return a new promise because we are dependent on summing the items for each day.
		if (step === "day") {
			timePeriodObjects = this.sumTimePeriodByDay(items, timePeriod);
			dateType = "date";
		}
		else if (step === 'week') {
			timePeriodObjects = this.sumTimePeriodByWeek(items, timePeriod);
		}
		else if (step === 'month') {
			timePeriodObjects = this.sumTimePeriodByMonth(items, timePeriod);
		}

		if (forGraphing) {
			return ({
				"labels": timePeriodObjects.map((period) => period[dateType].format("MM-DD")),
				"spendingAmounts": timePeriodObjects.map((period) => period.totalCost)
			});
		}
		return timePeriodObjects;
	},

	//Rewrite this probably.
	generateAllUsersAllTimeExpenses(users){

		//Return a new promise because we are dependent on getting each users items.
		return new Promise((resolve) => {
			//Create a promise array of all the users and their spending.
			let allUsersSums = users.map((user) => this.sumAllTimeUserSpending(user));
			//We wait for the promise array of all the users spending to resolve.
			Promise.all(allUsersSums).then((userSpending) => {
				//Map the user objects first names and then the users spending to an array of labels for each.
				resolve({
					"nameLabels": userSpending.map((x) => x.user.get('firstName')),
					"spendingLabels": userSpending.map((x) => x.spending)
				});
			}).catch(function (err) {
				console.log(err);
			});

		});
	},

	/**
	 * Generates and formats the data values and labels for a user's spending over a specified time period.
	 * Ex: Want to find expenses over past week - returns [['Monday','Tuesday',etc'], [10,20,etc]]
	 * @param {user} user
	 * @param {Array} timePeriod [timeLength, timeSpan] ex [1, week] [3, months], [last,week], etc
	 * @return {Promise} {LabelsArray, SpendingArray]
	 */
	generateFormattedUserExpenses(user, timePeriod, forGraphing){
		//Return a new promise because we are dependent on summing items over a time period.
		return new Promise((resolve) => {
			user.get('purchasedList').then((purchasedList) => {
				purchasedList.get('purchasedListItems').then((items) => {
					resolve(this.sumTimePeriodExpenses(items, timePeriod, forGraphing));
				});
			});
		});
	},

	//TODO Add method header - method is DONE
	generateAllUsersFormattedExpenses(pantry, timePeriod, forGraphing){
		//labelsArray = this.generateLabelsForTimePeriod(timePeriod);
		//Return a new promise because we are dependent on summing items over a time period.
		return new Promise((resolve) => {
			//Create and array of sums for each day by mapping each moment object to the sum function.
			pantry.get('purchasedItems').then((items) => {
				resolve(this.sumTimePeriodExpenses(items, timePeriod, forGraphing));
			});
		});
	},

});
