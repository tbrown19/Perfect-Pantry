import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('graphs/graph-options-modal', 'Integration | Component | graphs/graph options modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{graphs/graph-options-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#graphs/graph-options-modal}}
      template block text
    {{/graphs/graph-options-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
