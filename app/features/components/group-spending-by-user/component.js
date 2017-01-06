import Ember from 'ember';

export default Ember.Component.extend({
  graphColors: Ember.inject.service('theme-helper'),
  graphOperations: Ember.inject.service('graph-operations'),
  chartData: [],
  chartLabels:  [],



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

  chartLabel: Ember.computed('chartLabel', function () {
    //For consistency sake this is a computed property, but doesn't actually have to be as of right now.
    return "Spending breakdown by user";
  }),



  resolveChartData: Ember.computed('resolveChartData', function () {
    const users = this.get('pantryUsers');
    let promises = [];
    const numUsers = users.toArray().length;

    users.forEach((user) => {

      //We first need to resolve the promise of getting the users purchased items list, then we can move on
      user.get('purchasedList').then((purchasedList) => {

        //After we get that we can now call the helper function to sum their expenses over the time period.
        //This is also a promise because it relies on a promise in the helper method that gets all the items that
        //they have purchased by looking at their purchased list.
        promises.push(this.get('graphOperations').sumUserExpenses(user, purchasedList, "ALL"));
        //If we have a list of promises equal to the size of the number of users we have, then we have gotten every
        //users purchased list and now we can wait for the promise to resovle.
        if(promises.length == numUsers ){
          Promise.all(promises).then((results) => {
            //Once the promise resolves we update our array of chart data.
            let labels = [];
            let data = [];
            results.forEach((result) => {
              labels.push(result[0]);
              data.push(result[1]);

            });

            this.set('chartLabels',labels);
            this.set('chartData', data);

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
        data: this.get('chartData'),
        backgroundColor: this.get('backgroundColors'),
        borderColor: this.get('borderColors'),
        borderWidth: 1
      }]
    }
  }),

});
