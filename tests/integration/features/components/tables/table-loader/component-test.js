import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tables/table-loader', 'Integration | Component | tables/table loader', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tables/table-loader}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tables/table-loader}}
      template block text
    {{/tables/table-loader}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
