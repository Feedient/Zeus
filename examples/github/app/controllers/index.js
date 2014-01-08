app.core.router.get('/', function() {
	// Change active state
	app.lib.ui.setActive('home');

	// Render views/index.html to #main
	app.core.view.render('index', false, '#main', function() {
		// Since the view contains a link, we need to let the router look for new links to watch
		app.core.router.assignEvents();
	});
});