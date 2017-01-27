import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('helpers/sortable-table', 'Integration | Component | helpers/sortable table', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{helpers/sortable-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#helpers/sortable-table}}
      template block text
    {{/helpers/sortable-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
