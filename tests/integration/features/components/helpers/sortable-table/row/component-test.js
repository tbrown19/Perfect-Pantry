import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('helpers/sortable-table/row', 'Integration | Component | helpers/sortable table/row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{helpers/sortable-table/row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#helpers/sortable-table/row}}
      template block text
    {{/helpers/sortable-table/row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
