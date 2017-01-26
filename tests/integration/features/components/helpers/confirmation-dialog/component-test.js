import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('helpers/confirmation-dialog', 'Integration | Component | helpers/confirmation dialog', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{helpers/confirmation-dialog}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#helpers/confirmation-dialog}}
      template block text
    {{/helpers/confirmation-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
