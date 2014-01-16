'use strict';

$(function() {
	window.app = {};

	require(['app/config'], function() {
		var loaders = [];

		loaders.push(function(callback) {
			loadFiles('core', app.config.core, callback);
		});

		loaders.push(function(callback) {
			loadFiles('lib', app.config.libraries, callback);
		});

		loaders.push(function(callback) {
			app.helpers = {};
			loadFiles('helpers', app.config.helpers, callback, true);
		});

		loaders.push(function(callback) {
			loadFiles('controllers', app.config.controllers, callback, true);
		});

		async.series(loaders, function() {
			$(window).trigger('ZeusLoaded');
		});
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
		if (!app[namespace] && !dontInitialize) app[namespace] = {};
		
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