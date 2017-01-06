import Ember from 'ember';
import moment from 'moment';

export default Ember.Service.extend({


  sumUserExpenses(user, purchasedList, timePeriod) {
    let totalSpent = 0;

    return new Promise((resolve) => {
      this.getItemsWithinTimePeriod(user, purchasedList, timePeriod).then((purchasedItemsToSum) => {
        purchasedItemsToSum.forEach((item) => {
          totalSpent += parseInt(item.get('price'));
        });
      }).then(() => {
        resolve([user.get('firstName'), totalSpent]);
      });

    });
    //We first need to wait for the other function to find all the items within our desired time period, then we'll sum.

  },

  getItemsWithinTimePeriod(user, purchasedList, timePeriod){
    //We will be returning this array of items that fell within the requested time period.
    let itemsWithinPeriod = [];
    return purchasedList.get('purchasedListItems').then((purchasedItems) => {
      //If the time period is ALL then we simply add every item that the user has ever bought.
      if (timePeriod == "ALL") {
        purchasedItems.forEach((item) => {
          itemsWithinPeriod.push(item);
        });
      }
      return itemsWithinPeriod;
    });


    // console.log("todays date is ");
    // console.log(moment().subtract(30, 'days'));
    // console.log("so you are " + user.get('firstName'));
    // console.log("so you want items from the past: " + timePeriod);

  }
});
