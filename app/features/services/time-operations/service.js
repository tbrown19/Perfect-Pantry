import Ember from 'ember';
import moment from 'moment';

export default Ember.Service.extend({

	periodToBoundDates(timePeriod){
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
		//We to search until the item we are checking has a purchase date before our last date in a time period,
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
});
