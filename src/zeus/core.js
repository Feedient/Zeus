'use strict';

$(function() {
	window.app = {};

	var initialize = function() {
		var loaders = [];

		for (var i in app.config.autoLoad) {
			(function(key, value) {
				loaders.push(function(callback) {
					if ($.isArray(value)) {
						loadFiles(key, value, callback);
					} else {
						loadFiles(key, value.files, callback, !value.initialize);
					}
				});
			}(i, app.config.autoLoad[i]));
		}

		// Autoload all components
		async.series(loaders, function() {
			// All files have been autoloaded, give libraries opportunity to preload own assets
			app.core.hooks.trigger('loaded', function() {
				// All necessary assets have been preloaded
				app.core.hooks.trigger('ready');
			});
		});
	};

	require(['app/config'], function() {
		if (app.config.preInitializationHook) {
			require([app.config.preInitializationHook], function() {
				var fileParts = app.config.preInitializationHook.split('/');
				var file = fileParts[fileParts.length - 1];

				app[file](initialize);
			});
		} else {
			initialize();
		}
	});

	/**
	 * Load the provided files and initialize them
	 * @param String namespace
	 * @param Array files
	 * @param Function callback
	 * @param Boolean dontInitialize
	 */
	var loadFiles = function(namespace, files, callback, dontInitialize) {
		// Create a key to store them
		if (!app[namespace]) app[namespace] = {};

		// Load the files
		require(files, function() {
			// File loaded, init it now and store it
			files.forEach(function(filePath) {
				var fileParts = filePath.split('/');
				var file = fileParts[fileParts.length - 1];

				if (!dontInitialize)
					app[namespace][file] = new app[namespace][file]();
			});
			
			// Callback if done loading.
			callback();
		});
	};
});