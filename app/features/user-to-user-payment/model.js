import DS from 'ember-data';

export default DS.Model.extend({
	sender:DS.belongsTo('user'),
	receiver:DS.belongsTo('user'),
	paymentAmount: DS.attr('number'),
	paymentDate: DS.attr('String'),
});
