app.services.github = function() {
	/**
	 * Get repository data from GitHub
	 * @param Function callback(data)
	 */
	this.getRepositories = function(callback) {
		if (app.core.cache.has('github.repositories')) {
			return callback(app.core.cache.get('github.repositories'));
		}

		app.core.api.get('/orgs/feedient/repos', function(data) {
			app.core.cache.add('github.repositories', data);
			callback(data);
		});
	};
};