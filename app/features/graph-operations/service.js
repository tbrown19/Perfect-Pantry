import Ember from 'ember';
import moment from 'moment';

export default Ember.Service.extend({

  /**
   * Sums an individual users expenses for all time. This method is broken out of the daily one because it is a bit
   * different and works well being it's own function so that it doesn't have to deal with dates.
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

  //TODO add method header
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

  //TODO add method header
  sumTimePeriodUserExpenses(user, purchasedList, timePeriod){
    timePeriod = [2, 'Week', 'Day'];

    let momentPeriods = this.generateMomentObjects(timePeriod);

    //Return a new promise because we are dependent on summing the items for each day.
    return new Promise((resolve) => {
      //Create and array of sums for each day by mapping each moment object to the sum function.
      let dailyTotals = momentPeriods.map((moment) => {
        return this.sumSingleDayUserExpenses(user, purchasedList, moment.format('MM-DD-YYYY'));
      });

      Promise.all(dailyTotals).then((results) => {
        let totals = results.map((x) => x[2]);
        let totalSpentOverPeriod = totals.reduce((a, b) => a + b, 0);
        console.log(user.get("firstName"), totalSpentOverPeriod);
        resolve([user, timePeriod, totalSpentOverPeriod]);
      }).catch(function (err) {
        console.log(err);
      })
    });


  },

  /**
   * Sums the expenses of a list of users
   * @param {Array} users - an ember data array of users
   * @param {String} timePeriod
   * @return {Promise} allUserExpenses - ['Label','Total Spent']
   */
  sumAllTimeAllUsersExpenses(users){

  },

  sumSingleDayAllUsersExpenses(pantry, date){

    //Return a new promise because we are dependent on getting the pantry items
    return new Promise((resolve) => {
      this.getAllUsersItemsByDay(pantry, date).then((purchasedItems) => {
        //Map the prices of the items to their own array.
        let itemPrices = purchasedItems.map((x) => x.get('price'));
        //Then sum them and return so that the we can move onto resolving the promise.
        return itemPrices.reduce((a, b) => a + b, 0);
      }).then((totalSpentOnDay) => {
        console.log(date, totalSpentOnDay);
        resolve([pantry, date, totalSpentOnDay]);
      });
    });
  },

  //TODO add method header
  sumTimePeriodAllUsersExpenses(pantry, timePeriod){

    let momentPeriods = this.generateMomentObjects(timePeriod);

    //Return a new promise because we are dependent on summing the items for each day.
    return new Promise((resolve) => {
      //Create and array of sums for each day by mapping each moment object to the sum function.
      let dailyTotals = momentPeriods.map((moment) => {
        return this.sumSingleDayAllUsersExpenses(pantry, moment.format('MM-DD-YYYY'));
      });

      Promise.all(dailyTotals).then((results) => {
        let totals = results.map((x) => x[2]);
        let totalSpentOverPeriod = totals.reduce((a, b) => a + b, 0);
        resolve([timePeriod, totalSpentOverPeriod]);
      }).catch(function (err) {
        console.log(err);
      })
    });
  },

  //TODO add method header
  getSingleUserItemsByDay(purchasedList, date){
    let itemsOnDate = [];

    //Return a new promise because we are dependent on getting the items from the purchased list.
    return new Promise((resolve) => {
      purchasedList.get('purchasedListItems').then((purchasedItems) => {
        //If the items purchased date is the same as the date we are looking for, then add it to the array.
        itemsOnDate = purchasedItems.filter(item => {
          if (item.get('purchasedDateFormatted') == date) return item
        });

      }).then(() => {
        resolve(itemsOnDate);

      }).catch(function (err) {
        console.log(err);
      })
    });
  },

  //TODO add method header
  getAllUsersItemsByDay(pantry, date){
    let itemsOnDate = [];
     console.log(pantry.get('id'));
    //Return a new promise because we are dependent on getting the items from the purchased list.
    return new Promise((resolve) => {
      pantry.get('purchasedItems').then((purchasedItems) => {
        //If the items purchased date is the same as the date we are looking for, then add it to the array.
        itemsOnDate = purchasedItems.filter(item => {
          if (item.get('purchasedDateFormatted') == date) return item
        });
      }).then(() => {
        resolve(itemsOnDate);
      }).catch(function (err) {
        console.log(err);
      })
    });
  },

  /**
   * Returns a list of items purchased by a single user over specified time period
   * @param {user} user
   * @param {purchasedList} purchasedList
   * @param {String} timePeriod
   * @return {Array} itemsWithinPeriod - The items they bought over the time period
   */
  getItemsWithinTimePeriod(user, purchasedList, timePeriod){
    //We will be returning this array of items that fell within the requested time period.
    let itemsWithinPeriod = [];
    return purchasedList.get('purchasedListItems').then((purchasedItems) => {

      return itemsWithinPeriod;
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
  generateFormattedUserExpenses(user, purchasedList, timePeriod){},

  generateAllUsersFormattedExpenses(users, timePeriod){},

  generateMomentObjects(timePeriod){
    let timeLength = timePeriod[0]; //Last, 1, 2, 3, 4, etc
    const timeSpan = timePeriod[1].toLowerCase(); //Day, Month, Week, Year
    let step = timePeriod[2].toLowerCase();
    let startDate, endDate;
    let moments = [];
    step = step + "s";
    if (timeSpan == 'day') {

    }
    else if (timeSpan == 'week') {
      if (timeLength == 'Last') {
        startDate = moment().subtract(1, 'weeks').startOf('isoWeek');
        endDate = moment().subtract(1, 'weeks').endOf('isoWeek').add(1);
      }
      else {
        endDate = moment();
        startDate = moment().subtract(timeLength, 'weeks');
      }

      //We want to make the first object in the moments array the original start date
      moments.push(startDate.clone());

      //Then we loop until the two dates equal each other, adding the dates along the way.
      while (startDate < endDate) {
        startDate.add(1, step);
        moments.push(startDate.clone());

      }
      if (timeLength == 'Last') {
        moments.pop();
      }

      return moments;

    }
    else if (timeSpan == 'month') {

    }
    else if (timeSpan == 'year') {

    }

  },

  generateLabelsForTimePeriod(timePeriod){
    const timeLength = timePeriod[0];
    const timeSpan = timePeriod[1];
    //this.generateWeeklyLabels('last');
  },
  //
  // generateWeeklyLabels(timeLength)
  // {
  //   let labels = [];
  //   let startDate, endDate;
  //
  //   if (timeLength == 'last') {
  //     startDate = moment().subtract(1, 'weeks').startOf('isoWeek');
  //     endDate = moment().subtract(1, 'weeks').endOf('isoWeek');
  //     timeLength = 1;
  //   }
  //
  //   else {
  //
  //   }
  //   console.log(startDate.format('MM-DD'));
  //   console.log(startDate.format('dddd'));
  //   for (let i = 7 * timeLength - 1; i > 0; i--) {
  //     console.log(startDate.add(1, 'days').format('MM-DD'));
  //     console.log(startDate.format('dddd'));
  //   }
  //
  // }
  // ,
  //
  // generateMonthlyLabels(timeLength)
  // {
  //
  // },

  formatMoment(moment){
    console.log(`${moment.format('dddd')} - ${moment.format('MM-DD')}`);
  },


});
