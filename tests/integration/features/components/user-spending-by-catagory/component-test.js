import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-spending-by-catagory', 'Integration | Component | user spending by catagory', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{user-spending-by-catagory}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#user-spending-by-catagory}}
      template block text
    {{/user-spending-by-catagory}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
