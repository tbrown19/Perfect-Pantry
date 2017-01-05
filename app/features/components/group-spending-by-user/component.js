import Ember from 'ember';

export default Ember.Component.extend({
  graphColors: Ember.inject.service('theme-helper'),
  graphOperations: Ember.inject.service('graph-operations'),
  chartDataArray: [],

  //We need to get all the users in the pantry in a nice format so we can use them to find the date and labels.
  pantryUsers: Ember.computed('backgroundColorsArray', function () {
    return this.get('user').get('pantry').get('users');
  }),


  backgroundColors: Ember.computed('backgroundColorsArray', function () {
    return this.get('graphColors').get('backgroundColorsArray');
  }),

  borderColors: Ember.computed('borderColorsArray', function () {
    return this.get('graphColors').get('borderColorsArray');
  }),

  chartLabels: Ember.computed('chartLabels', function () {
    //Create an array of labels, which will be the user name, and the get each users name and add it to it.
    let labels = [];

    //Constants that the helper method needds to find out how much the user has spent over the specified time.
    const users = this.get('pantryUsers');

    users.forEach((user) => {
      labels.push(user.get('firstName'));
    });

    return labels;
  }),

  chartLabel: Ember.computed('chartLabel', function () {
    //For consistency sake this is a computed property, but doesn't actually have to be as of right now.
    return "Spending breakdown by user";
  }),







  chartData: Ember.computed('chartData', function () {
    const users = this.get('pantryUsers');
    let promises = [];
    const numUsers = users.toArray().length;
    let data = [];

    users.forEach((user) => {
      //We first need to resolve the promise of getting the users purchased items list, then we can move on
      user.get('purchasedList').then((purchasedList) => {
        //After we get that we can now call the helper function to sum their expenses over the time period.
        //This is also a promise because it relies on a promise in the helper method that gets all the items that
        //they have purchased by looking at their purchased list.
        promises.push(this.get('graphOperations').sumUserExpenses(user, purchasedList, "ALL"));
        if(promises.length == numUsers ){
          Promise.all(promises).then((results) => {
            this.set('chartDataArray', results);
          }).catch((e) => {
              // Handle errors here
          });
        }
      });
    });

  }),


  graphOptions: Ember.computed('data', function () {

    return {
      animation : true,
      labels: this.get('chartLabels'),
      indexLabelFontSize: 16,
      datasets: [{
        label: this.get('chartLabel'),
        data: this.get('chartDataArray'),
        backgroundColor: this.get('backgroundColors'),
        borderColor: this.get('borderColors'),
        borderWidth: 1
      }]
    }
  }),


});
