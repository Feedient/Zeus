app.core.router.get('/repos', function() {
	/**
	 * Load the repository data from the API and render it
	 */
	var getRepositoryData = function() {
		app.services.github.getRepositories(function(repos) {
			app.core.view.render('repos-list', { repos: repos }, '#repos-list');
		});
	};

	this.clickButton = function() {
		alert('You clicked a button');
	};

	// Render views/repos.html to #main, then call getRepositoryData
	app.core.view.render('repos', false, '#main', getRepositoryData);
});