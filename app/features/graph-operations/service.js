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

  //TODO add method header
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

  //TODO add method header
  sumTimePeriodAllUsersExpenses(pantry, timePeriod){
    let momentPeriods = this.generateMomentObjects(timePeriod);
    let step = timePeriod[2];



    //Return a new promise because we are dependent on summing the items for each day.
    if(step == "day"){
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
        })
      });
    }
    else{
      return new Promise((resolve) => {
        //Create and array of sums for each day by mapping each moment object to the sum function.
        let periodTotals = this.getAllUsersItemsWithinTimePeriod(pantry, momentPeriods).then((itemsByPeriod) => {
          return itemsByPeriod.map((period) => {
            return period.reduce((a, b) => a + b, 0);
          });
        });
        periodTotals.then((results) => {
          console.log(periodTotals);
          let totals = results;
          console.log(results);
          let totalSpentOverPeriod = totals.reduce((a, b) => a + b, 0);
          console.log(totalSpentOverPeriod);
          resolve([timePeriod, totals, totalSpentOverPeriod]);
        }).catch(function (err) {
          console.log(err);
        })
      });
    }

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
  getSingleUserItemsWithinTimePeriod(user, purchasedList, timePeriod){
    //We will be returning this array of items that fell within the requested time period.
    let itemsWithinPeriod = [];

    //If array is say [1-4, 1-11, 1-18] we want to sum all values less than 1-4, and put in that first spot in our result.
    return purchasedList.get('purchasedListItems').then((purchasedItems) => {
      return itemsWithinPeriod;
    });

  },


  //TODO add method header
  getAllUsersItemsWithinTimePeriod(pantry, momentPeriods){

    //Return a new promise because we are dependent on getting the items from the purchased list.
    return new Promise((resolve) => {
      pantry.get('purchasedItems').then((purchasedItems) => {
        //Start off at index 0 on our list of moments
        let curMomentIndex = 0;
        let momentsLength = momentPeriods.length;
        let itemsInOnePeriod = [];
        let itemsInTimePeriod = [];

        //We then loop through every purchased item. Since the purchased items are already in order of when they were bought,
        // we are able to make a few assumptions inside of the for loop.
        for (let j = 0; j < purchasedItems.length; j++) {

          //The current, or minimum moment we are checking against.
          let curMoment = momentPeriods[curMomentIndex].format();
          //The next, or upper moment we are checking against.
          let nextMoment = momentPeriods[curMomentIndex + 1] || moment();
          nextMoment = nextMoment.format();

          //The current item we are checking is the one that is at index j, and then we also get its purchased date.
          let curItem = purchasedItems.objectAt(j);
          let curItemDate = curItem.get('purchasedDate');

          //If the moment is between the lower and upper moment, then we want to add it to a array.
          //The array we add it to is keeping track of items that are purchased between the two dates,
          // this array will eventually be correlated to the lower date label in a different array.
          if (moment(curItemDate).isBetween(curMoment, nextMoment)) {
            console.log(curMoment, " <= ", curItemDate, " <= ", nextMoment);
            itemsInOnePeriod.push(curItem.get('price'));
            //If we are at the index of length  - 1 it means this is the last moment date, and therefore
            if (j == purchasedItems.length - 1) {
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
        console.log(itemsInTimePeriod);
        //console.log(itemsWithinPeriod);
        resolve(itemsInTimePeriod);
      }).catch(function (err) {
        console.log(err);
      })
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
  },

  //TODO Add method header - Generates the labels and the data for all users expenses over a time period.
  generateAllUsersFormattedExpenses(pantry, timePeriod){
    console.log("derp");
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

  //TODO add method header
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
      if (timeLength == 'last') {
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
      if (timeLength == 'last') {
        moments.pop();
      }
      return moments;

    }
    else if (timeSpan == 'month') {
      if (timeLength == 'last') {
        startDate = moment().subtract(1, 'months').startOf('month');
        endDate = moment().subtract(1, 'months').endOf('month');
      }
      else {
        endDate = moment();
        startDate = moment().subtract(timeLength, 'months');
      }

      //We want to make the first object in the moments array the original start date
      moments.push(startDate.clone());

      //Then we loop until the two dates equal each other, adding the dates along the way.
      while (startDate < endDate) {
        console.log(startDate.format('MM-DD'), "<" ,endDate.format('MM-DD'));
        startDate.add(1, step);
        moments.push(startDate.clone());

      }
      if (timeLength == 'last') {
        moments.pop();
        moments.push(endDate);
      }
      else{
        moments.pop();
      }
      console.log(moments);
      return moments;

    }
    else if (timeSpan == 'year') {

    }

  },

  generateLabelsForTimePeriod(timePeriod){
    let momentPeriods = this.generateMomentObjects(timePeriod);
    let momentLabels = [];
    momentPeriods.forEach((moment) => {
      momentLabels.push(moment.format('MM-DD'));
    });
    return momentLabels;
  },


  formatMoment(moment){
    console.log(`${moment.format('dddd')} - ${moment.format('MM-DD')}`);
  },


});
