import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('group-spending-by-catagory', 'Integration | Component | group spending by catagory', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{group-spending-by-catagory}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#group-spending-by-catagory}}
      template block text
    {{/group-spending-by-catagory}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
