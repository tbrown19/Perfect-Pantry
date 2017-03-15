import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expenses/splitting/pantry-member-card', 'Integration | Component | expenses/splitting/pantry member card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{expenses/splitting/pantry-member-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#expenses/splitting/pantry-member-card}}
      template block text
    {{/expenses/splitting/pantry-member-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
