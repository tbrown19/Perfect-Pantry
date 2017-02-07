import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('group-shopping-list/display-table', 'Integration | Component | group shopping list/display table', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{group-shopping-list/display-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#group-shopping-list/display-table}}
      template block text
    {{/group-shopping-list/display-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
