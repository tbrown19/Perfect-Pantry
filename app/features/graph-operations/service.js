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
    let totalSpentOnDay = 0;
    return new Promise((resolve) => {
      this.getItemsByDay(purchasedList, date).then((purchasedItemsToSum) => {
        purchasedItemsToSum.forEach((item) => {
          totalSpentOnDay += parseInt(item.get('price'));
        });
      }).then(() => {
        resolve([user, totalSpentOnDay]);
        console.log([user.get('firstName'), date, totalSpentOnDay]);
      });
    });
  },

  //TODO add method header
  sumTimePeriodUserExpenses(user, purchasedList, timePeriod){
    let totalSpentOverPeriod = 0;
    timePeriod = [1,'Week'];
    let timePeriod2 = ['Last', 'Week'];

    let momentPeriods = this.generateMomentObjects(timePeriod, 'Day');
    // console.log("---------------------------");
    // this.generateMomentObjects(timePeriod2, 'Day');
    // console.log("---------------------------");
    momentPeriods.forEach((moment) => {
      this.sumSingleDayUserExpenses(user, purchasedList, moment.format('MM-DD-YYYY'));
    });



  },


  //TODO add method header
  getItemsByDay(purchasedList, date){
    let itemsOnDate = [];
    return purchasedList.get('purchasedListItems').then((purchasedItems) => {
      purchasedItems.forEach((item) => {
        if (item.get('purchasedDateFormatted') == date) {
          itemsOnDate.push(item);
        }
      });
      return itemsOnDate;
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
   * Sums the expenses of a list of users
   * @param {Array} users - an ember data array of users
   * @param {String} timePeriod
   * @return {Promise} allUserExpenses - ['Label','Total Spent']
   */
  sumAllUsersExpenses(users, timePeriod){
    let promises = [];

    users.forEach((user) => {
      //We first need to resolve the promise of getting the users purchased items list, then we can move on
      user.get('purchasedList').then((purchasedList) => {

        //After we get that we can now call the helper function to sum their expenses over the time period.
        //This is also a promise because it relies on a promise in the helper method that gets all the items that
        //they have purchased by looking at their purchased list.
        promises.push(this.sumUserExpenses(user, purchasedList, ['']));
        //If we have a list of promises equal to the size of the number of users we have, then we have gotten every
        //users purchased list and now we can wait for the promise to resolve.
        if (promises.length == numUsers) {
          Promise.all(promises).then((results) => {
            //Once the promise resolves we update our array of chart data.
            results.forEach((result) => {
              labels.push(result[0]);
              data.push(result[1]);
            });
            //After we finish handling every result we can update the global labels and data
            this.set('chartLabels', labels);
            this.set('chartData', data);

          }).catch((e) => {
            console.log(e);
            // Handle errors here
          });
        }
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

  },


  generateMomentObjects(timePeriod, step){
    let timeLength = timePeriod[0]; //Last, 1, 2, 3, 4, etc
    const timeSpan = timePeriod[1].toLowerCase(); //Day, Month, Week, Year
    let startDate,endDate;
    let moments = [];
    step = step + "s";
    if(timeSpan == 'day'){

    }
    else if(timeSpan == 'week'){
      if (timeLength == 'Last') {
        startDate = moment().subtract(1, 'weeks').startOf('isoWeek');
        endDate = moment().subtract(1, 'weeks').endOf('isoWeek').add(1);
      }
      else{
        endDate = moment();
        startDate = moment().subtract(1, 'weeks');
      }

      //We want to make the first object in the moments array the original start date
      moments.push(startDate.clone());

      //Then we loop until the two dates equal each other, adding the dates along the way.
      while( startDate < endDate){
        startDate.add(1, step);
        moments.push(startDate.clone());

      }
      if(timeLength == 'Last'){
        moments.pop();
      }

      return moments;

    }
    else if(timeSpan == 'month'){

    }
    else if(timeSpan == 'year'){

    }

  },

  generateLabelsForTimePeriod(timePeriod){
    const timeLength = timePeriod[0];
    const timeSpan = timePeriod[1];
    //this.generateWeeklyLabels('last');
  },

  generateWeeklyLabels(timeLength){
    let labels = [];
    let startDate, endDate;

    if (timeLength == 'last') {
      startDate = moment().subtract(1, 'weeks').startOf('isoWeek');
      endDate = moment().subtract(1, 'weeks').endOf('isoWeek');
      timeLength = 1;
    }

    else {

    }
    console.log(startDate.format('MM-DD'));
    console.log(startDate.format('dddd'));
    for (let i = 7 * timeLength - 1; i > 0; i--) {
      console.log(startDate.add(1,'days').format('MM-DD'));
      console.log(startDate.format('dddd'));
    }

  },

  generateMonthlyLabels(timeLength){

  },


  formatMoment(moment){
    console.log(`${moment.format('dddd')} - ${moment.format('MM-DD')}`);
  },


});
