app.router.error(function() {
	// Remove active state
	$('.active').removeClass('active');

	// Render views/404.html to #main
	app.view.render('404');
});