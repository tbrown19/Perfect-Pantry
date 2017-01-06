import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    const user = this.modelFor('application');
    // return this.store.query('shoppingListItem', {
    //   orderBy: 'pantry', equalTo: user.get('pantry.id')
    // }).then((shoppingItems) => {
    //   return this.store.query('purchasedListItem', {
    //     orderBy: 'purchasedList', equalTo: user.get('purchasedList.id')
    //   }).then((purchasedItems) => {
    //     console.log(purchasedItems);
    //     return Ember.RSVP.hash({
    //       user: this.get('user'),
    //       shoppingItems: shoppingItems,
    //       purchasedItems: purchasedItems
    //     });
    //   });
    // });
    return this.store.findAll('pantry').then((pantries) => {
      const pantry = pantries.filterBy("id", user.get('pantry.id')).objectAt(0);
      console.log(pantry);
      return pantry.get('shoppingItems').then((shoppingItems) => {
        console.log(shoppingItems);
        shoppingItems.forEach((item) => {
          console.log(item.get('name'));
        });
        return Ember.RSVP.hash({
          user: user,
          shoppingItems: shoppingItems,
          purchasedItems: pantry.get('purchasedItems')
        });
      });

    });

  }
});
