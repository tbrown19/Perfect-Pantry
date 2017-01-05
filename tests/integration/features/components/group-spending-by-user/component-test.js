import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('group-spending-by-user', 'Integration | Component | group spending by user', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{group-spending-by-user}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#group-spending-by-user}}
      template block text
    {{/group-spending-by-user}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
