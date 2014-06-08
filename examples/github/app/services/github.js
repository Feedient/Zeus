app.services.github = function() {
	/**
	 * Get repository data from GitHub
	 * @param Function callback(data)
	 */
	this.getRepositories = function(callback) {
		app.core.api.get('/orgs/feedient/repos', callback);
	};
};