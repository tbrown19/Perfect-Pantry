import Ember from 'ember';
import moment from 'moment';
import _ from 'lodash';
export default Ember.Service.extend({

	//TODO add method header - method is DONE
	getSingleUserItemsByDay(items, date){
		console.log(items, date);
		return items.filter(item => {
			return item.get('purchasedDateFormatted') === date;
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

	timePeriodToStartEndDates(timePeriod){
		const timeLength = timePeriod[0]; //Last, 1, 2, 3, 4, etc
		const timeSpan = timePeriod[1].toLowerCase(); //Day, Month, Week, Year
		let startDate, endDate;
		let timeFormatted = timeSpan === 'week' ? "isoWeek" : timeSpan;

		if (timeLength === 'last') {
			//If we want the LAST, we want the start and end of the previous time span.
			startDate = moment().subtract(1, timeSpan + 's').startOf(timeFormatted);
			endDate = moment().subtract(1, timeSpan + 's').endOf(timeFormatted);
		}
		else if (timeLength === 'this') {
			//If we want THIS, we want the start of the time span until now.
			startDate = moment().startOf(timeFormatted);
			endDate = moment();
		}
		else {
			//Otherwise we want from the desired time length until now.
			endDate = moment();
			startDate = moment().subtract(timeLength, timeSpan + 's');
		}

		return {
			"startDate": startDate,
			"endDate": endDate
		};
	},

	findFirstItemWithinPeriod(items, firstDate){
		let firstValidIndex = 0;
		firstDate = firstDate.startDate || firstDate.date;
		//We to search until the item we are checking has a purchase date after our first date in a time period,
		while (moment(items.objectAt(firstValidIndex).get('purchasedDate')).isBefore(firstDate)) {
			firstValidIndex++;
		}
		return firstValidIndex;
	},

	findLastItemWithinPeriod(items, endDate){
		let lastValidIndex = items.length - 1;
		endDate = endDate.endDate || endDate.date;
		//We to search until the item we are checking has a purchase date after our first date in a time period,
		while (moment(items.objectAt(lastValidIndex).get('purchasedDate')).startOf('day').isAfter(endDate)) {
			lastValidIndex--;
		}
		return lastValidIndex;
	},

	generateDayObjects(startDate, endDate){
		let dayObjects = [];

		//Start date is incremented by a loop within the current week object.
		while (startDate < endDate) {
			let currentDay = {
				"date": startDate.clone(),
				"items": [],
				"totalCost": 0
			};
			startDate.add(1, "day");
			dayObjects.push(currentDay);
		}
		//We want to make sure the last objects end date is the end date we were provided, not a week after the start date.
		return dayObjects;
	},

	generateWeekObjects(startDate, endDate){
		let weekObjects = [];

		//Start date is incremented by a loop within the current week object.
		while (startDate <= endDate) {
			let currentWeek = {
				"startDate": startDate.clone(),
				"endDate": startDate.add(1, "week").clone(),
				"items": [],
				"totalCost": 0
			};
			weekObjects.push(currentWeek);
		}
		//We want to make sure the last objects end date is the end date we were provided, not a week after the start date.
		weekObjects[weekObjects.length - 1].endDate = endDate;
		return weekObjects;
	},

	generateMonthObjects(startDate, endDate){
		let monthObjects = [];

		//Start date is incremented by a loop within the current week object.
		while (startDate <= endDate) {
			console.log(startDate.clone());
			let currentMonth = {
				"startDate": startDate.add(1, "day").startOf("month").clone(),
				"endDate": startDate.endOf("month").clone(),
				"items": [],
				"totalCost": 0
			};
			monthObjects.push(currentMonth);
		}
		//We want to make sure the last objects end date is the end date we were provided, not a week after the start date.
		monthObjects[monthObjects.length - 1].endDate = endDate;
		return monthObjects;
	},

	addItemsToTimePeriodObjects(items, timePeriods){
		let curTimePeriod = 0;
		let startIndex = this.findFirstItemWithinPeriod(items, timePeriods[0]);
		let endIndex = this.findLastItemWithinPeriod(items, timePeriods[timePeriods.length - 1]);

		for (let i = startIndex; i <= endIndex; i++) {
			let startDate = timePeriods[curTimePeriod].startDate;
			let endDate = timePeriods[curTimePeriod].endDate;
			let itemPurchDate = moment(items.objectAt(i).get('purchasedDate'));

			//If our current items date is between the two dates of the current week, then we add it to that weeks items.
			if (itemPurchDate.isBetween(startDate, endDate, null, [])) {
				timePeriods[curTimePeriod].items.push(items.objectAt(i));
				timePeriods[curTimePeriod].totalCost += items.objectAt(i).get('price');
			}
			//We increase the current period so we can if the item fits there, in order to recheck the item we subtract 1 from i
			else {
				curTimePeriod++;
				i--;
			}
		}
		return timePeriods;
	},

	addItemsToDayObjects(items, days){
		let curTimePeriod = 0;
		let startIndex = this.findFirstItemWithinPeriod(items, days[0]);
		let endIndex = this.findLastItemWithinPeriod(items, days[days.length - 1]);
		for (let i = startIndex; i <= endIndex; i++) {
			let date = days[curTimePeriod].date;
			let itemPurchDate = moment(items.objectAt(i).get('purchasedDate'));
			//If our current items day is the same as the current day then we add it and its price to our day object.
			if (itemPurchDate.isSame(date, 'day')) {
				days[curTimePeriod].items.push(items.objectAt(i));
				days[curTimePeriod].totalCost += items.objectAt(i).get('price');
			}
			//We increase the current day so we can if the item fits there, in order to recheck the item we subtract 1 from i
			else {
				curTimePeriod++;
				i--;
			}
		}
		return days;
	},

	sumTimePeriodByDay(items, timePeriod){
		//Generate the date objects, then pass them on to generate week objects.
		let dates = this.timePeriodToStartEndDates(timePeriod);
		let dayObjects = this.generateDayObjects(dates.startDate, dates.endDate);
		//Add the items to each day object as well as sum up the items costs.
		dayObjects = this.addItemsToDayObjects(items, dayObjects);
		return dayObjects;
	},

	sumTimePeriodByWeek(items, timePeriod){
		//Generate the date objects, then pass them on to generate week objects.
		let dates = this.timePeriodToStartEndDates(timePeriod);
		let weekObjects = this.generateWeekObjects(dates.startDate, dates.endDate);
		//Add the items to each week object as well as sum up the items costs.
		weekObjects = this.addItemsToTimePeriodObjects(items, weekObjects);
		return weekObjects;
	},

	sumTimePeriodByMonth(items, timePeriod){
		//Generate the date objects, then pass them on to generate week objects.
		let dates = this.timePeriodToStartEndDates(timePeriod);
		console.log(dates.startDate.clone(), dates.endDate.clone());
		let monthObjects = this.generateMonthObjects(dates.startDate, dates.endDate);
		//Add the items to each week object as well as sum up the items costs.
		monthObjects = this.addItemsToTimePeriodObjects(items, monthObjects);
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
			console.log(timePeriodObjects);
		}
		else if (step === 'month') {
			timePeriodObjects = this.sumTimePeriodByMonth(items, timePeriod);
		}

		if (forGraphing) {
			return ({
				"labels": timePeriodObjects.map((period) => {
					return period[dateType].format("MM-DD");
				}),
				"spendingAmounts": timePeriodObjects.map((period) => {
					return period.totalCost;
				})
			});
		}
		else {
			return (timePeriodObjects);
		}
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

	//TODO add method header  - method is NOT DONE
	//TODO Add method header - method is DONE
	// generateLabelsForTimePeriod(timePeriod){
	// 	let momentPeriods = this.generateMomentObjects(timePeriod);
	// 	let momentLabels = [];
	// 	momentPeriods.forEach((moment) => {
	// 		momentLabels.push(moment.format('MM-DD'));
	// 	});
	// 	return momentPeriods.map((period) => {
	// 		return period.format("MM-DD");
	// 	});
	// },

	//TODO Add method header - method is DONE
	formatMoment(moment){
		console.log(`${moment.format('dddd')} - ${moment.format('MM-DD')}`);
	},

});
