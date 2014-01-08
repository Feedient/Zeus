window.router.get('/repos', function() {
	// Change active state
	$('.active').removeClass('active');
	$('#repos-link').addClass('active');
	
	/**
	 * Load the repository data from the API and render it
	 */
	var getRepositoryData = function() {
		window.api.get('/orgs/feedient/repos', function(repos) {
			window.view.render('repos-list', { repos: repos }, '#repos-list');
		});
	};

	this.clickButton = function() {
		alert('You clicked a button');
	};

	// Render views/repos.html to #main
	window.view.render('repos', false, '#main', getRepositoryData);
});