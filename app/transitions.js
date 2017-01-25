export default function(){
	this.transition(
		this.fromRoute('shopping-list'),
		this.toRoute('dashboard'),
		this.use('toRight'),
		this.reverse('toLeft')
	);
	this.transition(
		this.fromRoute('sign-up'),
		this.toRoute('dashboard'),
		this.use('toRight'),
		this.reverse('toLeft')
	);
};