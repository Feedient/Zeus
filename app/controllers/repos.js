app.router.get('/repos', function() {
	// Change active state
	$('.active').removeClass('active');
	$('#repos-link').addClass('active');
	
	/**
	 * Load the repository data from the API and render it
	 */
	var getRepositoryData = function() {
		app.api.get('/orgs/feedient/repos', function(repos) {
			app.view.render('repos-list', { repos: repos }, '#repos-list');
		});
	};

	this.clickButton = function() {
		alert('You clicked a button');
	};

	// Render views/repos.html to #main
	app.view.render('repos', false, '#main', getRepositoryData);
});