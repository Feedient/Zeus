app.api = function() {
	var errorHandler;
	var successHandler;
	var customHeaders = {};

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
		if (errorHandler) {
			return errorHandler(request.status);
		}

		app.log.warning('No API error handler specified.');
		app.log.error('API responded with status ' + request.status);
	};

	/**
	 * Listen for API errors
	 * @param Function callback(httpStatus)
	 */
	this.onError = function(callback) {
		errorHandler = callback;
	};

	/**
	 * Listen for successful API calls
	 * @param Function callback(data, successCallback)
	 */
	this.onSuccess = function(callback) {
		successHandler = callback;
	};

	/**
	 * Add a custom HTTP header to every API request
	 * @param String key
	 * @param String/Function value
	 */
	this.addHeader = function(key, value) {
		customHeaders[key] = value;
	};

	/**
	 * Merge HTTP headers with custom headers
	 * @param Object headers
	 * @return Object
	 */
	var getHeaders = function(headers) {
		if (!headers) var headers = {};

		if (customHeaders) {
			for (var i in customHeaders) {
				if (typeof customHeaders[i] == 'Function') {
					headers[i] = customHeaders[i]();
				} else {
					headers[i] = customHeaders[i];
				}
			}
		}

		return headers;
	};

	/**
	 * Handle successful API requests
	 * @param Mixed data
	 * @param Function callback(data)
	 */
	var handleSuccess = function(data, callback) {
		if (!successHandler) {
			return callback(data);
		}

		successHandler(data, callback);
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
			headers: getHeaders(),
			type: 'GET',
			success: function(data) {
				handleSuccess(data, callback);
			},
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
			headers: getHeaders(),
			type: 'POST',
			data: data,
			success: function(data) {
				handleSuccess(data, callback);
			},
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
			headers: getHeaders({
				'x-http-method-override': 'PUT'
			}),
			type: 'POST',
			data: data,
			success: function(data) {
				handleSuccess(data, callback);
			},
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
			headers: getHeaders({
				'x-http-method-override': 'DELETE'
			}),
			type: 'POST',
			data: data,
			success: function(data) {
				handleSuccess(data, callback);
			},
			error: handleError
		});
	};
};