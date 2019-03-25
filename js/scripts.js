$(document).ready(function(){
	var altura = $('.menu').offset().top;

	$(window).on('scroll', function(){
		$('.menu').addClass('menu-fixed');
	} else {
		$('.menu').removeClass('menu-fixed');
	});
});
