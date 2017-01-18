import Ember from 'ember';

export default Ember.Component.extend({
  graphColors: Ember.inject.service('theme-helper'),
  graphOperations: Ember.inject.service('graph-operations'),
  chartData: [],
  chartLabels:  [],


  backgroundColors: Ember.computed('backgroundColorsArray', function () {
    return this.get('graphColors').get('backgroundColorsArray');
  }),

  borderColors: Ember.computed('borderColors', function () {
    return this.get('graphColors').get('borderColorsArray');
  }),

  chartLabel: Ember.computed('chartLabel', function () {
    //For consistency sake this is a computed property, but doesn't actually have to be as of right now.
    return "Spending breakdown by pantry member";
  }),


  //This chart is a pie graph that shows all the user's expenses relative to each other.
  resolveChartData: Ember.computed('resolveChartData', function () {
    const users = this.get('allUsers');
    //We need an array of the promises, while we wait for them to resolve
    let promises = [];
    //Then we need an array of labels and data which we eventually use to create the graph.
    let labels = [];
    let data = [];
    const numUsers = users.toArray().length;
    let timePeriod = [1,"week", "day"];

    users.forEach((user) => {
      //We first need to resolve the promise of getting the users purchased items list, then we can move on
      user.get('purchasedList').then((purchasedList) => {

        //After we get that we can now call the helper function to sum their expenses over the time period.
        //This is also a promise because it relies on a promise in the helper method that gets all the items that
        //they have purchased by looking at their purchased list.
        promises.push(this.get('graphOperations').sumAllTimeUserExpenses(user, purchasedList));
        this.get('graphOperations').sumTimePeriodUserExpenses(user, purchasedList, "Derp");

        //If we have a list of promises equal to the size of the number of users we have, then we have gotten every
        //users purchased list and now we can wait for the promise to resovle.
        if(promises.length == numUsers ){
          Promise.all(promises).then((results) => {
            //Once the promise resolves we update our array of chart data.
            results.forEach((result) => {
              labels.push(result[0].get('firstName'));
              data.push(result[1]);
            });
            //After we finish handling every result we can update the global labels and data
            this.set('chartLabels',labels);
            this.set('chartData', data);

          }).catch((e) => {
            console.log(e);
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
