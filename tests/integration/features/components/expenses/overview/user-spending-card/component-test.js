import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expenses/overview/user-spending-card', 'Integration | Component | expenses/overview/user spending card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{expenses/overview/user-spending-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#expenses/overview/user-spending-card}}
      template block text
    {{/expenses/overview/user-spending-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
