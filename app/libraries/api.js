app.api = function() {
	/**
	 * Format the URL with access token and API URL
	 * @param String endpoint
	 * @return String
	 */
	var formatURL = function(endpoint) {
		return app.config.API + endpoint;
	};

	/**
	 * Display a nice error message if the request failed
	 * @param XMLHttpRequest request
	 * @param String textStatus
	 * @param String error
	 */
	var handleError = function(request, textStatus, error) {
		// ...
	};

	/**
	 * Make a GET request to the API server
	 * @param String endpoint
	 * @param Function callback
	 */
	this.get = function(endpoint, callback) {
		app.log.debug('Calling API endpoint [GET ' + endpoint + ']');

		$.ajax({
			url: formatURL(endpoint),
			type: 'GET',
			success: callback,
			error: handleError
		});
	};

	/**
	 * Make a POST request to the API server
	 * @param String endpoint
	 * @param Function callback
	 */
	this.post = function(endpoint, data, callback) {
		app.log.debug('Calling API endpoint [POST ' + endpoint + ']');

		$.ajax({
			url: formatURL(endpoint),
			type: 'POST',
			data: data,
			success: callback,
			error: handleError
		});
	};

	/**
	 * Make a POST request to the API server
	 * @param String endpoint
	 * @param Function callback
	 */
	this.put = function(endpoint, data, callback) {
		app.log.debug('Calling API endpoint [POST ' + endpoint + ']');

		$.ajax({
			url: formatURL(endpoint),
			headers: {
				'x-http-method-override': 'PUT'
			},
			type: 'POST',
			data: data,
			success: callback,
			error: handleError
		});
	};

	/**
	 * Make a DELETE request to the API server
	 * @param String endpoint
	 * @param Function callback
	 */
	this.delete = function(endpoint, data, callback) {
		app.log.debug('Calling API endpoint [DELETE ' + endpoint + ']');

		$.ajax({
			url: formatURL(endpoint),
			headers: {
				'x-http-method-override': 'DELETE'
			},
			type: 'POST',
			data: data,
			success: callback,
			error: handleError
		});
	};
};