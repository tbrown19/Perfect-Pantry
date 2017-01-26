import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pantry/pantry-request-form', 'Integration | Component | pantry/pantry request form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pantry/pantry-request-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pantry/pantry-request-form}}
      template block text
    {{/pantry/pantry-request-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
