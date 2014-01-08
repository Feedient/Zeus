window.router.error(function() {
	// Remove active state
	$('.active').removeClass('active');

	// Render views/404.html to #main
	window.view.render('404');
});