app.core.router.error(function() {
	// Remove active state
	app.lib.ui.setActive(false);

	// Render views/404.html to #main
	app.core.view.render('404');
});