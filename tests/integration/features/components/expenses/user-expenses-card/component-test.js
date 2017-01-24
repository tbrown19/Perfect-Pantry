import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expenses/user-expenses-card', 'Integration | Component | expenses/user expenses card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{expenses/user-expenses-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#expenses/user-expenses-card}}
      template block text
    {{/expenses/user-expenses-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
