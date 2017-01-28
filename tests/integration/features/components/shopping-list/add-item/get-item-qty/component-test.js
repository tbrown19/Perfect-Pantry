import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('shopping-list/add-item/get-item-qty', 'Integration | Component | shopping list/add item/get item qty', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{shopping-list/add-item/get-item-qty}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#shopping-list/add-item/get-item-qty}}
      template block text
    {{/shopping-list/add-item/get-item-qty}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
