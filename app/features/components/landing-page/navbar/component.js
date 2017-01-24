import Ember from 'ember';

export default Ember.Component.extend({
	didScroll: false,

	scrollPage: function () {
		var sy = this.get('scrollY')(),
			classie = window.classie,
			header = document.querySelector('.navbar-custom'),
			changeHeaderOn = 200;

		if (sy >= changeHeaderOn) {
			classie.add(header, 'navbar-shrink');
		}
		else {
			classie.remove(header, 'navbar-shrink');
		}
		this.set('didScroll', false);
	},

	scrollY: function () {
		var docElem = document.documentElement;

		return window.pageYOffset || docElem.scrollTop;
	},

	didInsertElement: function () {
		var didScroll = this.get('didScroll');

		/*jshint unused:false*/
		window.addEventListener('scroll', function (event) {
			if (!didScroll) {
				this.set('didScroll', true);
				setTimeout(this.get('scrollPage').bind(this), 150);
			}
		}.bind(this), false);


		/*!
		 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
		 * Code licensed under the Apache License v2.0.
		 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
		 */

		// jQuery for page scrolling feature - requires jQuery Easing plugin
		$(function () {
			$('a.page-scroll').bind('click', function (event) {
				var $anchor = $(this);
				$('html, body').stop().animate({
					scrollTop: $($anchor.attr('href')).offset().top
				}, 1000, 'easeInOutExpo');
				event.preventDefault();
			});
		});

		// Highlight the top nav as scrolling occurs
		$('body').scrollspy({
			target: '.navbar-fixed-top'
		});

		// Closes the Responsive Menu on Menu Item Click
		$('.navbar-collapse ul li a').click(function () {
			$('.navbar-toggle:visible').click();
		});

	}
});