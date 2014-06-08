app.services.github = function() {
	/**
	 * Get repository data from GitHub
	 * @param Function callback(data)
	 */
	this.getRepositories = function(callback) {
		if (app.lib.cache.has('github.repositories')) {
			return callback(app.lib.cache.get('github.repositories'));
		}

		app.core.api.get('/orgs/feedient/repos', function(data) {
			app.lib.cache.add('github.repositories', data);
			callback(data);
		});
	};
};