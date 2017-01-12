import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('join-pantry-request-form', 'Integration | Component | join pantry request form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{join-pantry-request-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#join-pantry-request-form}}
      template block text
    {{/join-pantry-request-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
