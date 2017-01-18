import Ember from 'ember';
import moment from 'moment';

export default Ember.Service.extend({

	/**
	 * Sums an individual users expenses for all time.
	 * @param {user} user
	 * @param {purchasedList} purchasedList
	 * @return {Promise} [user, totalSpent]
	 */
	sumAllTimeUserExpenses(user, purchasedList) {
		let totalSpentAllTime = 0;
		return new Promise((resolve) => {
			purchasedList.get('purchasedListItems').then((purchasedItemsToSum) => {
				purchasedItemsToSum.forEach((item) => {
					totalSpentAllTime += parseFloat(item.get('price'));
				});
			}).then(() => {
				resolve([user, totalSpentAllTime]);
			});
		});
	},

	//TODO add method header - method is DONE
	sumSingleDayUserExpenses(user, purchasedList, date){
		//Return a new promise because we are dependent on getting the items by day and waiting on that.
		return new Promise((resolve) => {
			this.getSingleUserItemsByDay(purchasedList, date).then((purchasedItemsToSum) => {
				//Map the prices of the items to their own array.
				let itemPrices = purchasedItemsToSum.map((x) => x.get('price'));

				//Then sum them and return so that the we can move onto resolving the promise.
				return itemPrices.reduce((a, b) => a + b, 0);
			}).then((totalSpentOnDay) => {
				resolve([user, date, totalSpentOnDay]);
			});
		});
	},

	//TODO add method header - method is NOT DONE - needs to be rewritten like sumTimePeriodAllUsersExpenses
	sumTimePeriodUserExpenses(user, purchasedList, timePeriod){
		let step = timePeriod[2].toLowerCase();
		let momentPeriods = this.generateMomentObjects(timePeriod);
		if (step === "day") {

			console.log("we should be here.");
			//Return a new promise because we are dependent on summing the items for each day.
			return new Promise((resolve) => {
				//Create and array of sums for each day by mapping each moment object to the sum function.
				let dailyTotals = momentPeriods.map((moment) => {
					return this.sumSingleDayUserExpenses(user, purchasedList, moment.format('MM-DD-YYYY'));
				});
				Promise.all(dailyTotals).then((results) => {
					let totals = results.map((x) => x[2]);
					let totalSpentOverPeriod = totals.reduce((a, b) => a + b, 0);
					resolve([timePeriod, totals, totalSpentOverPeriod]);
					console.log([timePeriod, totals, totalSpentOverPeriod]);
				}).catch(function (err) {
					console.log(err);
				});
			});
		}

		else {
			return new Promise((resolve) => {
				console.log("are we here??");
				//Create and array of sums for each day by mapping each moment object to the sum function.
				let periodTotals = this.getSingleUserItemsWithinTimePeriod(user, purchasedList, momentPeriods).then((itemsByPeriod) => {
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
	getSingleUserItemsByDay(purchasedList, date){
		let itemsOnDate = [];

		//Return a new promise because we are dependent on getting the items from the purchased list.
		return new Promise((resolve) => {
			purchasedList.get('purchasedListItems').then((purchasedItems) => {
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
		console.log("moment periods ", momentPeriods);
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
						console.log(curMoment, " <= ", curItemDate, " <= ", nextMoment);
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
				console.log("single user items", itemsInTimePeriod);
				//console.log(itemsWithinPeriod);
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

	/**
	 * Generates and formats the data values and labels for a user's spending over a specified time period.
	 * Ex: Want to find expenses over past week - returns [['Monday','Tuesday',etc'], [10,20,etc]]
	 * @param {user} user
	 * @param {purchasedList} purchasedList
	 * @param {Array} timePeriod [timeLength, timeSpan] ex [1, week] [3, months], [last,week], etc
	 * @return {Promise} [user, totalSpent]
	 */
	generateFormattedUserExpenses(user, purchasedList, timePeriod){
		let spendingArray = [];
		let labelsArray = [];
		labelsArray = this.generateLabelsForTimePeriod(timePeriod);

		//Return a new promise because we are dependent on summing items over a time period.
		return new Promise((resolve) => {
			//Create and array of sums for each day by mapping each moment object to the sum function.
			this.sumTimePeriodUserExpenses(user, purchasedList, timePeriod).then((expensesArray) => {
				console.log(expensesArray);
				spendingArray = expensesArray[1];
				console.log(spendingArray);
				resolve([labelsArray, spendingArray]);
			}).catch(function (err) {

				console.log(err);
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
				resolve([labelsArray, spendingArray]);
			}).catch(function (err) {

				console.log(err);
			});
		});


	},

	generateAllUsersAllTimeExpenses(users){

		//Return a new promise because we are dependent on getting each users items.
		return new Promise((resolve) => {

			let purchasedLists = users.map((user) => {
				return user.get('purchasedList').then((purchasedList) => {
					return [user, purchasedList];
				});
			});

			//First we have to resolve all the users purchased lists, before we can go on to summing the items from them.
			Promise.all(purchasedLists).then((results) => {
				let allUsersSums = results.map((result) => {
					return this.sumAllTimeUserExpenses(result[0], result[1]);
				});
				//After we have allUsersSums, an array that contains information about how much each user has spent all time, we move on.
				Promise.all(allUsersSums).then((userSpending) => {
					let spendingArray = userSpending.map((x) => x[1]);
					let labelsArray = userSpending.map((x) => x[0].get('firstName'));
					resolve([labelsArray, spendingArray]);
					console.log(resolve([labelsArray, spendingArray]));
				});
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


		let timeFormatted;
		if(timeSpan === 'week'){
			//Weeks can be a little weird when getting the start of them, so we make sure to use iso Week.
			timeFormatted = 'isoWeek';
		}
		if (timeLength === 'last') {
			startDate = moment().subtract(timeLength, timeSpan + 's').startOf(timeFormatted);
			endDate = moment().subtract(timeLength, timeSpan + 's').endOf(timeFormatted).add(1);
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
		//If we are getting the last period, we need to pop the last value no matter what. For months however we add the current date.
		//This is for formatting purposes so that it looks nice.
		if (timeLength === 'last') {
			moments.pop();
			if(timeSpan === 'month'){
				moments.push(endDate);
			}
		}
		else{
			if(timeSpan === 'month'){
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
		return momentLabels;
	},

	//TODO Add method header - method is DONE
	formatMoment(moment){
		console.log(`${moment.format('dddd')} - ${moment.format('MM-DD')}`);
	},


});
