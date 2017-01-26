export default function(){
	this.transition(
		this.fromRoute('shopping-list'),
		this.toRoute('dashboard'),
		this.use('toLeft'),
		this.reverse('toRight')
	);
};