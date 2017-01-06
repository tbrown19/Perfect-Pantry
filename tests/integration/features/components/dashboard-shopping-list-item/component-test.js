import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dashboard-shopping-list-item', 'Integration | Component | dashboard shopping list item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dashboard-shopping-list-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dashboard-shopping-list-item}}
      template block text
    {{/dashboard-shopping-list-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
