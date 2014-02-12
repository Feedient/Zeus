app.core.router.get('/repos', function() {
	/**
	 * Load the repository data from the API and render it
	 */
	var getRepositoryData = function() {
		app.core.api.get('/orgs/feedient/repos', function(repos) {
			app.core.view.render('repos-list', { repos: repos }, '#repos-list');
		});
	};

	this.clickButton = function() {
		alert('You clicked a button');
	};

	// Render views/repos.html to #main
	app.core.view.render('repos', false, '#main', getRepositoryData);
});