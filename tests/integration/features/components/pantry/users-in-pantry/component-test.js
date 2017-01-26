import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pantry/users-in-pantry', 'Integration | Component | pantry/users in pantry', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pantry/users-in-pantry}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pantry/users-in-pantry}}
      template block text
    {{/pantry/users-in-pantry}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
