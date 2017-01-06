import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pantry-needed-items-list', 'Integration | Component | pantry needed items list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pantry-needed-items-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pantry-needed-items-list}}
      template block text
    {{/pantry-needed-items-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
