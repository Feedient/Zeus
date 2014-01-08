'use strict';

$(function() {
	window.app = {};

	require(['app/config'], function() {
		loadFiles("core", app.config.core, function() {
			loadFiles("helpers", app.config.helpers, triggerDoneLoading);
		});
	});

	/**
	 * Load the provided files and initialize them
	 * @param String namespace
	 * @param Array files
	 * @param Function callback
	 */
	var loadFiles = function(namespace, files, callback) {
		// Create a key to store them
		if (!app[namespace]) app[namespace] = {};
		
		// Load the files
		require(files, function() {
			// File loaded, init it now and store it
			files.forEach(function(filePath) {
				var fileParts = filePath.split('/');
				var file = fileParts[fileParts.length - 1];

				app[namespace][file] = new app[namespace][file]();
			});
			
			// Callback if done loading.
			callback();
		});
	};

	var triggerDoneLoading = function() {
		$(window).trigger('frameworkReady');
		
		// When done loading the framework, call the onFrameworkInit hook
		for (var i in app.core) {
			if (app.core[i].onFrameworkInit) {
				app.core[i].onFrameworkInit();    
			}
		};
	};
});