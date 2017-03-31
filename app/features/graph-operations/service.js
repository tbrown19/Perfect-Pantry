import Ember from 'ember';
import moment from 'moment';

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
	 * @param {purchasedList} purchasedList
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
		let timeFormatted = timeSpan;

		if (timeSpan === 'week') {
			//Weeks can be a little weird when getting the start of them, so we make sure to use iso Week.
			timeFormatted = 'isoWeek';
		}
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
		firstDate = firstDate.startDate;
		//We to search until the item we are checking has a purchase date after our first date in a time period,
		while(moment(items.objectAt(firstValidIndex).get('purchasedDate')).isBefore(firstDate)){
			console.log(items.objectAt(firstValidIndex).get('purchasedDate'), " has been checked.");
			firstValidIndex++;
		}
		return firstValidIndex;
	},

	findLastItemWithinPeriod(items, endDate){
		let lastValidIndex = items.length - 1;
		endDate = endDate.endDate;
		//We to search until the item we are checking has a purchase date after our first date in a time period,
		while(moment(items.objectAt(lastValidIndex).get('purchasedDate')).isAfter(endDate)){
			console.log(items.objectAt(lastValidIndex).get('purchasedDate'), " has been checked.");
			lastValidIndex--;
		}
		return lastValidIndex;
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


	generateDayObjects(startDate, endDate){
		console.log(startDate, endDate);

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



	addItemsToTimePeriodObjects(items, timePeriods){
		let curTimePeriod = 0;
		let startIndex = this.findFirstItemWithinPeriod(items, timePeriods[0]);
		console.log("timePeriods", timePeriods);
		let endIndex = this.findLastItemWithinPeriod(items, timePeriods[timePeriods.length - 1]);

		for(let i = startIndex; i <= endIndex; i++){
			let startDate = timePeriods[curTimePeriod].startDate;
			let endDate = timePeriods[curTimePeriod].endDate;
			let itemPurchDate = moment(items.objectAt(i).get('purchasedDate'));

			//If our current items date is between the two dates of the current week, then we add it to that weeks items.
			if(itemPurchDate.isBetween(startDate,endDate, null, [])) {
				timePeriods[curTimePeriod].items.push(items.objectAt(i));
				timePeriods[curTimePeriod].totalCost += items.objectAt(i).get('price');

			}
			//Wwe increase the current week so we can if the item fits there, in order to recheck the item we subtract 1 from i
			else{
				curTimePeriod++;
				i--;
			}
		}
		return timePeriods;
	},

	addItemsToTimePeriodObjects(items, timePeriods){
		let curTimePeriod = 0;
		let startIndex = this.findFirstItemWithinPeriod(items, timePeriods[0]);
		console.log("timePeriods", timePeriods);
		let endIndex = this.findLastItemWithinPeriod(items, timePeriods[timePeriods.length - 1]);

		for(let i = startIndex; i <= endIndex; i++){
			let startDate = timePeriods[curTimePeriod].startDate;
			let endDate = timePeriods[curTimePeriod].endDate;
			let itemPurchDate = moment(items.objectAt(i).get('purchasedDate'));

			//If our current items date is between the two dates of the current week, then we add it to that weeks items.
			if(itemPurchDate.isBetween(startDate,endDate, null, [])) {
				timePeriods[curTimePeriod].items.push(items.objectAt(i));
				timePeriods[curTimePeriod].totalCost += items.objectAt(i).get('price');

			}
			//Wwe increase the current week so we can if the item fits there, in order to recheck the item we subtract 1 from i
			else{
				curTimePeriod++;
				i--;
			}
		}
		return timePeriods;
	},
	

	sumTimePeriodByDay(items, timePeriod){
		let dates = this.timePeriodToStartEndDates(timePeriod);
		let dayObjects = this.generateDayObjects(dates.startDate, dates.endDate);
		let acc = 0;
		dayObjects.forEach((day)=> {
			day.items = items.filter(item => {
				console.log(acc++);
				return item.get('purchasedDateFormatted') === day.date.format("MM-DD-YYYY");
			});
			day.totalCost =  day.items.reduce((total, item) => total + item.get('price'), 0);
		});
		return dayObjects;
	},

	sumTimePeriodByWeek(items, timePeriod){
		//Generate the date objects, then pass them on to generate week objects.
		let dates = this.timePeriodToStartEndDates(timePeriod);
		let weekObjects = this.generateWeekObjects(dates.startDate, dates.endDate);

		//Add the items to each week object as well as sum up the items costs.
		weekObjects = this.addItemsToTimePeriodObjects(items,weekObjects);
    return weekObjects;
	},

	sumTimePeriodByMonth(items, timePeriod){
		let dates = this.timePeriodToStartEndDates(timePeriod);
		let dayObjects = this.generateDayObjects(dates.startDate, dates.endDate);

		dayObjects.forEach((day)=> {
			day.items = items.filter(item => {
				return item.get('purchasedDateFormatted') === day.date.format("MM-DD-YYYY");
			});
			day.totalCost =  day.items.reduce((total, item) => total + item.get('price'), 0);
		});
		return dayObjects;
	},

	//TODO add method header - method is NOT DONE - needs to be rewritten like sumTimePeriodAllUsersExpenses
	sumTimePeriodUserExpenses(user, purchasedList, timePeriod, forGraphing){
		console.log("time period2", timePeriod);
		let step = timePeriod[2].toLowerCase();
		let timePeriodObjects;
		//Return a new promise because we are dependent on summing the items for each day.
		return new Promise((resolve) => {
			//We get the items here so that we only have to load them once.
			purchasedList.get('purchasedListItems').then((items) => {
				if (step === "day") {
					timePeriodObjects = this.sumTimePeriodByDay(items, timePeriod);
					if(forGraphing) {
						let labelsArray = timePeriodObjects.map((period) => {
							return period.date.format("MM-DD");
						});

						let spendingArray = timePeriodObjects.map((period) => {
							return period.totalCost;
						});
						resolve({
							"labels": labelsArray,
							"spendingAmounts" : spendingArray
						});
					}
					else{
						resolve(timePeriodObjects);
					}
				}
				else if (step === 'week'){
					timePeriodObjects = this.sumTimePeriodByWeek(items, timePeriod);
					if(forGraphing) {
						let labelsArray = timePeriodObjects.map((period) => {
							return period.startDate.format("MM-DD");
						});

						let spendingArray = timePeriodObjects.map((period) => {
							return period.totalCost;
						});
						resolve({
							"labels": labelsArray,
							"spendingAmounts" : spendingArray
						});
					}
					else{
						resolve(timePeriodObjects);
					}

				}
				else if (step === 'Month'){
					timePeriodObjects = this.sumTimePeriodByMonth(items, timePeriod);
					if(forGraphing) {
						let labelsArray = timePeriodObjects.map((period) => {
							return period.startDate.format("MM-DD");
						});

						let spendingArray = timePeriodObjects.map((period) => {
							return period.totalCost;
						});
						resolve({
							"labels": labelsArray,
							"spendingAmounts" : spendingArray
						});
					}
					else{
						resolve(timePeriodObjects);
					}

				}
			});
		});

	},

	/**
	 * Sums the expenses of a list of users for all time.
	 * @param {Array} users - an ember data array of users
	 * @param {String} timePeriod
	 * @return {Promise} allUserExpenses - ['Label','Total Spent']
	 */
	sumAllTimeAllUsersExpenses(users){
		console.log(users);
	},

	//TODO add method header - method is DONE
	sumSingleDayAllUsersExpenses(pantry, date){

		//Return a new promise because we are dependent on getting the pantry items
		return new Promise((resolve) => {
			this.getAllUsersItemsByDay(pantry, date).then((purchasedItems) => {
				//Map the prices of the items to their own array.
				let itemPrices = purchasedItems.map((x) => x.get('price'));
				//Then sum them and return so that the we can move onto resolving the promise.
				return itemPrices.reduce((a, b) => a + b, 0);
			}).then((totalSpentOnDay) => {
				//console.log(date, totalSpentOnDay);
				resolve([pantry, date, totalSpentOnDay]);
			});
		});
	},

	//TODO add method header - method is DONE i think.
	sumTimePeriodAllUsersExpenses(pantry, timePeriod){
		let momentPeriods = this.generateMomentObjects(timePeriod);
		let step = timePeriod[2].toLowerCase();

		//Return a new promise because we are dependent on summing the items for each day.
		if (step === "day") {
			return new Promise((resolve) => {
				//Create and array of sums for each day by mapping each moment object to the sum function.
				let dailyTotals = momentPeriods.map((moment) => {
					return this.sumSingleDayAllUsersExpenses(pantry, moment.format('MM-DD-YYYY'));
				});

				Promise.all(dailyTotals).then((results) => {
					let totals = results.map((x) => x[2]);
					let totalSpentOverPeriod = totals.reduce((a, b) => a + b, 0);

					resolve([timePeriod, totals, totalSpentOverPeriod]);
				}).catch(function (err) {
					console.log(err);
				});
			});
		}
		else {
			return new Promise((resolve) => {
				//Create and array of sums for each day by mapping each moment object to the sum function.
				let periodTotals = this.getAllUsersItemsWithinTimePeriod(pantry, momentPeriods).then((itemsByPeriod) => {
					return itemsByPeriod.map((period) => {
						return period.reduce((a, b) => a + b, 0);
					});
				});
				periodTotals.then((results) => {
					let totals = results;
					let totalSpentOverPeriod = totals.reduce((a, b) => a + b, 0);
					resolve([timePeriod, totals, totalSpentOverPeriod]);
				}).catch(function (err) {
					console.log(err);
				});
			});
		}

	},

	//TODO add method header - method is DONE
	getAllUsersItemsByDay(pantry, date){
		let itemsOnDate = [];

		//Return a new promise because we are dependent on getting the items from the purchased list.
		return new Promise((resolve) => {
			pantry.get('purchasedItems').then((purchasedItems) => {
				//If the items purchased date is the same as the date we are looking for, then add it to the array.
				itemsOnDate = purchasedItems.filter(item => {
					if (item.get('purchasedDateFormatted') === date) {
						return item;
					}
				});
			}).then(() => {
				resolve(itemsOnDate);
			}).catch(function (err) {
				console.log(err);
			});
		});
	},

	/**
	 * Returns a list of items purchased by a single user over specified time period
	 * @param {user} user
	 * @param {purchasedList} purchasedList
	 * @param {String} timePeriod
	 * @return {Array} itemsWithinPeriod - The items they bought over the time period
	 */
	getSingleUserItemsWithinTimePeriod(user, purchasedList, momentPeriods){
		//Return a new promise because we are dependent on getting the items from the purchased list.
		return new Promise((resolve) => {
			purchasedList.get('purchasedListItems').then((purchasedItems) => {
				//Start off at index 0 on our list of moments
				let curMomentIndex = 0;
				let itemsInOnePeriod = [];
				let itemsInTimePeriod = [];

				//We then loop through every purchased item. Since the purchased items are already in order of when they were bought,
				// we are able to make a few assumptions inside of the for loop.
				for (let j = 0; j < purchasedItems.length; j++) {

					//The current, or minimum moment we are checking against.
					let curMoment = momentPeriods[curMomentIndex].format();

					//The next, or upper moment we are checking against.
					//We either want to get the next moment in the list, or if it doesn't exist set it to today's date and then format it.
					let nextMoment = (momentPeriods[curMomentIndex + 1] || moment()).format();

					//The current item we are checking is the one that is at index j, and then we also get its purchased date.
					let curItem = purchasedItems.objectAt(j);
					let curItemDate = curItem.get('purchasedDate');

					//If the moment is between the lower and upper moment, then we want to add it to a array.
					//The array we add it to is keeping track of items that are purchased between the two dates,
					// this array will eventually be correlated to the lower date label in a different array.
					if (moment(curItemDate).isBetween(curMoment, nextMoment)) {
						itemsInOnePeriod.push(curItem.get('price'));

						//If we are at the last purchased item, then we can return the items in the time period and break
						//since we have checked every purchased item.
						if (j === purchasedItems.length - 1) {
							itemsInTimePeriod.push(itemsInOnePeriod);
							break;
						}
					}

					//If the date we are checking is AFTER the later date, then we update the moments index by 1, so that we our now
					//1 time period further ahead. We decrement j by one because we want to recheck that item against the newly updated
					//moments.
					else if (moment(curItemDate).isAfter(nextMoment)) {
						curMomentIndex += 1;
						j--;

						//If we reached this else it means that all the items are now after the current moment. Therefore we want to add
						//what we currently have to the array thats keeping track of the items over every moment.
						//Then we want to reset the items in one period array because we are about to start checking a new time period.
						itemsInTimePeriod.push(itemsInOnePeriod);
						itemsInOnePeriod = [];

					}
				}
				return itemsInTimePeriod;
			}).then((itemsInTimePeriod) => {
				resolve(itemsInTimePeriod);
			}).catch(function (err) {
				console.log(err);
			});
		});

	},

	//TODO add method header - method is DONE i think.
	getAllUsersItemsWithinTimePeriod(pantry, momentPeriods){

		//Return a new promise because we are dependent on getting the items from the purchased list.
		return new Promise((resolve) => {
			pantry.get('purchasedItems').then((purchasedItems) => {
				//Start off at index 0 on our list of moments
				let curMomentIndex = 0;
				let itemsInOnePeriod = [];
				let itemsInTimePeriod = [];

				//We then loop through every purchased item. Since the purchased items are already in order of when they were bought,
				// we are able to make a few assumptions inside of the for loop.
				for (let j = 0; j < purchasedItems.length; j++) {

					//The current, or minimum moment we are checking against.
					let curMoment = momentPeriods[curMomentIndex].format();

					//The next, or upper moment we are checking against.
					//We either want to get the next moment in the list, or if it doesn't exist set it to today's date and then format it.
					let nextMoment = (momentPeriods[curMomentIndex + 1] || moment()).format();

					//The current item we are checking is the one that is at index j, and then we also get its purchased date.
					let curItem = purchasedItems.objectAt(j);
					let curItemDate = curItem.get('purchasedDate');

					//If the moment is between the lower and upper moment, then we want to add it to a array.
					//The array we add it to is keeping track of items that are purchased between the two dates,
					// this array will eventually be correlated to the lower date label in a different array.
					if (moment(curItemDate).isBetween(curMoment, nextMoment)) {
						itemsInOnePeriod.push(curItem.get('price'));

						//If we are at the last purchased item, then we can return the items in the time period and break
						//since we have checked every purchased item.
						if (j === purchasedItems.length - 1) {
							itemsInTimePeriod.push(itemsInOnePeriod);
							break;
						}
					}

					//If the date we are checking is AFTER the later date, then we update the moments index by 1, so that we our now
					//1 time period further ahead. We decrement j by one because we want to recheck that item against the newly updated
					//moments.
					else if (moment(curItemDate).isAfter(nextMoment)) {
						curMomentIndex += 1;
						j--;

						//If we reached this else it means that all the items are now after the current moment. Therefore we want to add
						//what we currently have to the array thats keeping track of the items over every moment.
						//Then we want to reset the items in one period array because we are about to start checking a new time period.
						itemsInTimePeriod.push(itemsInOnePeriod);
						itemsInOnePeriod = [];

					}
				}
				return itemsInTimePeriod;
			}).then((itemsInTimePeriod) => {
				resolve(itemsInTimePeriod);
			}).catch(function (err) {
				console.log(err);
			});
		});

	},

	generateAllUsersAllTimeExpenses(users){

		//Return a new promise because we are dependent on getting each users items.
		return new Promise((resolve) => {
			//Create a promise array of all the users and their spending.
			let allUsersSums = users.map((user) => {
				return this.sumAllTimeUserSpending(user);
			});

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
	generateFormattedUserExpenses(user, timePeriod){
		//Return a new promise because we are dependent on summing items over a time period.
		return new Promise((resolve) => {
			user.get('purchasedList').then((purchasedList) => {
				this.sumTimePeriodUserExpenses(user, purchasedList, timePeriod, true).then((results) => {
					resolve(results);
				}).catch(function (err) {
					console.log(err);
				});
			});
		});
	},

	//TODO Add method header - method is DONE
	generateAllUsersFormattedExpenses(pantry, timePeriod){
		let spendingArray = [];
		let labelsArray = [];
		labelsArray = this.generateLabelsForTimePeriod(timePeriod);

		//Return a new promise because we are dependent on summing items over a time period.
		return new Promise((resolve) => {
			//Create and array of sums for each day by mapping each moment object to the sum function.
			this.sumTimePeriodAllUsersExpenses(pantry, timePeriod).then((expensesArray) => {
				spendingArray = expensesArray[1];
				//If the time period is focusing on the last x, then we actually don't want the spending that occurs at the last value,
				//We do want this spending in other cases however so we only remove it in this case.
				if (timePeriod[0] === "last") {
					spendingArray.pop();
					spendingArray.push(0);
				}
				resolve([labelsArray, spendingArray]);
			}).catch(function (err) {

				console.log(err);
			});
		});


	},

	//TODO add method header  - method is NOT DONE
	generateMomentObjects(timePeriod){
		const timeLength = timePeriod[0]; //Last, 1, 2, 3, 4, etc
		const timeSpan = timePeriod[1].toLowerCase(); //Day, Month, Week, Year
		const step = timePeriod[2].toLowerCase() + "s";
		let startDate, endDate;
		let moments = [];
		console.log("The step is ", step);

		let timeFormatted = timeSpan;
		if (timeSpan === 'week') {
			//Weeks can be a little weird when getting the start of them, so we make sure to use iso Week.
			timeFormatted = 'isoWeek';
		}
		if (timeLength === 'last') {
			console.log(timeFormatted);
			startDate = moment().subtract(1, timeSpan + 's').startOf(timeFormatted);
			endDate = moment().subtract(1, timeSpan + 's').endOf(timeFormatted);
		}
		else if (timeLength === 'this') {
			console.log(timeSpan);
			startDate = moment().startOf(timeFormatted);
			endDate = moment();
			console.log(startDate.clone());
			console.log(endDate.clone());

		}
		else {
			endDate = moment();
			startDate = moment().subtract(timeLength, timeSpan + 's');
		}

		//start date is a moment object which means it is constantly updating, therefore we must clone it to get a non changing copy of it.
		//We want to make the first object in the moments array the original start date
		moments.push(startDate.clone());

		//Then we loop until the two dates equal each other, adding the dates along the way.
		while (startDate < endDate) {
			startDate.add(1, step);
			moments.push(startDate.clone());

		}
		//If we are getting the last period, we need to pop the last value no matter what.
		if (timeLength === 'last') {
			moments.pop();
			//For months however we add the current date. This makes it so that the graph ends at the current date and looks nice.
			if (timeSpan === 'month' && moments.lastObject !== endDate) {
				moments.push(endDate);
			}
		}
		else {
			//Since months don't have a perfect 4 weeks, we need to pop the last moment ( because it could end up being past
			//todays date if we are adding a week at a time).
			if (timeSpan === 'month') {
				moments.pop();
			}
		}
		return moments;
	},

	//TODO Add method header - method is DONE
	generateLabelsForTimePeriod(timePeriod){
		let momentPeriods = this.generateMomentObjects(timePeriod);
		let momentLabels = [];
		momentPeriods.forEach((moment) => {
			momentLabels.push(moment.format('MM-DD'));
		});
		return momentPeriods.map((period) => {
			return period.format("MM-DD");
		});
	},

	//TODO Add method header - method is DONE
	formatMoment(moment){
		console.log(`${moment.format('dddd')} - ${moment.format('MM-DD')}`);
	},


});
