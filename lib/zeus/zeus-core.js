'use strict';

$(function() {
	window.app = {};
	window.app.helpers = {};
	window.app.providers = {};

    /**
     * Load the configuration
     */
	require(['app/config'], function() {
		// Load all other files from the config list
		require(app.config.system, autorun);
	});
    
    /**
	 * Execute the autorun files
	 */
	var autorun = function() {
		// Loop all loaded files
		app.config.system.forEach(function(filePath) {
			// Split the path by / to get each folder/file
			var fileParts = filePath.split('/');

			// Get the file name from the path
			var file = fileParts[fileParts.length - 1];

			if (app[file]) {
				app[file] = new app[file]();
			} else if(app.providers[file]) {
				app.providers[file] = app.providers[file]();
			}
		});

		$(window).trigger('frameworkReady');

		// Preload all views	
        console.log(window.view);
		window.view.preload(function() {
			// Load the controllers and then start the router
			require(app.config.controllers, app.router.initialize);
		});
	};
});