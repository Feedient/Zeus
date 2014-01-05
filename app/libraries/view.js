app.view = function() {
	var viewCache = {};

	/**
	 * Compile and output or pass along the template to the callback
	 * @param String source
	 * @param Array data
	 * @param Mixed callback CSS selector or callback
	 * @param Function thenCallback
	 */
	var compileView = function(file, source, data, callback, thenCallback) {
		if (typeof source === 'string') {
			app.log.debug('Compiled view [' + file + ']')
			viewCache[file] = Handlebars.compile(source);
		}

		var template = viewCache[file](data);

		if (typeof callback === 'string') {
			$(callback).html(template);
			if (thenCallback) thenCallback(callback);
		} else {
			callback(template);
		}
	};

	/**
	 * Render a view template
	 * @param String file
	 * @param Array data
	 * @param Function callback
	 * @param Function thenCallback
	 */
	this.render = function(file, data, callback, thenCallback) {
		if (!callback) var callback = '#main';
		
		if (viewCache[file]) {
			app.log.debug('Loaded view [' + file + '] from cache');
			compileView(file, viewCache[file], data, callback, thenCallback);
		} else {
			$.get(app.config.path + '/app/views/' + file + '.html', function(source) {
				app.log.debug('Loaded view [' + file + ']');
				compileView(file, source, data, callback, thenCallback);
			});
		}
	};

	/**
	 * Preload and cache compiled view files
	 */
	this.preload = function(callback) {
		var preloadFunctions = [];

		// Loop through all requested files
		app.config.preloadViews.forEach(function(file) {
			// Add a loading function to the preloadFunctions array
			preloadFunctions.push(function(callback) {
				// Load the view html file
				$.get(app.config.path + '/app/views/' + file + '.html', function(source) {
					app.log.debug('Preloaded view [' + file + ']');

					// Compile and cache the view
					compileView(file, source, false, callback);
				});
			});
		});

		for (var i in app.config.viewPartials) {
			(function() {
				var key = i;

				preloadFunctions.push(function(callback) {
					$.get(app.config.path + '/app/views/' + app.config.viewPartials[key] + '.html', function(source) {
						app.log.debug('Registered partial [' + key + ' => ' + app.config.viewPartials[key] + ']');
						Handlebars.registerPartial(key, Handlebars.compile(source));
						callback();
					});
				});
			}());
		};

		// Load the above functions in parallel
		async.parallelLimit(preloadFunctions, app.config.parallelLimit, function(err, results) {
			callback();
		});
	};
};