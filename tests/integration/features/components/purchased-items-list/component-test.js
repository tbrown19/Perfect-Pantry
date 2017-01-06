import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('purchased-items-list', 'Integration | Component | purchased items list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{purchased-items-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#purchased-items-list}}
      template block text
    {{/purchased-items-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
