import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expenses/splitting/payment-dialog', 'Integration | Component | expenses/splitting/payment dialog', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{expenses/splitting/payment-dialog}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#expenses/splitting/payment-dialog}}
      template block text
    {{/expenses/splitting/payment-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
