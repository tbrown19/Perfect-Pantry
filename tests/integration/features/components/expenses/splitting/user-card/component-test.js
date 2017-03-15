import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expenses/splitting/user-card', 'Integration | Component | expenses/splitting/user card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{expenses/splitting/user-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#expenses/splitting/user-card}}
      template block text
    {{/expenses/splitting/user-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
