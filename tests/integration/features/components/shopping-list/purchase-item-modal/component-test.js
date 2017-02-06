import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('shopping-list/purchase-item-modal', 'Integration | Component | shopping list/purchase item modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{shopping-list/purchase-item-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#shopping-list/purchase-item-modal}}
      template block text
    {{/shopping-list/purchase-item-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
