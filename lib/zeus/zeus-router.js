'use strict';

window.router = function() {
	var hooks = {};
	var errorHandler = false;
		
	this.active = false;

	/**
	 * Load the default controller
	 */
	this.initialize = function() {
		// Check for HTML5 pushState support
		if (history.pushState) {
			app.log.debug('Initialized router');
			$(window).bind('popstate', function() {
				app.router.routeTo(window.location.pathname);
			});

			app.router.assignEvents();
			app.router.routeTo(window.location.pathname);
		}
	};

	/**
	 * Click listener for links
	 * @param Event event
	 */
	var handleClick = function(event) {
		// Get the URL
		var link = $(this).attr('href');
		
		if(link && link !== 'javascript:void(0)') {
			// Load the page
			app.router.routeTo(link);

			// Send it to the browser history
			history.pushState('', '', link);

			// Prevent site from refreshing
			event.preventDefault();
		}
	};


	/**
	 * Assign click listeners to all internal links
	 */
	this.assignEvents = function() {
		if (history.pushState) {
			// Assign AJAX loading behavior
			$('a').each(function() {
				var element = $(this);

				// Make sure it has not been assigned already and is not an external link
				if (element.attr('data-hasevents') != '1' 
				&& element.attr('target') != '_blank'
				&& !/http(s)?:\/\//.test(element.attr('href'))
				&& element.attr('data-direct') != '1') {
					element.attr('data-hasevents', '1');

					element.on('click', handleClick);
				}
			});
		}
	};

	/**
	 * Listen for 404 errors
	 * @param Function callback
	 */
	this.error = function(callback) {
		errorHandler = callback;
	};

	/**
	 * Attach a controller to an URL
	 * @param String call
	 * @param Function object
	 */
	this.get = function(call, object) {
		hooks[call] = object;
	};

	/**
	 * Load an URL from the hooked controllers
	 * @param String url
	 */
	this.routeTo = function(url) {
		// Remove the base path from the URL
		url = url.replace(app.config.path, '');

		// Rewrite ./ to /
		if (/^\.\/$/.test(url)) {
			url = '/';
		}

		// Force / in the beginning of URL
		if (!/^\//.test(url)) {
			url = '/' + url;
		}

		// Remove / from the end
		if (url != '/' && /\/$/.test(url)) {
			url = url.substr(0, url.length - 1);
		}

		app.router.active = url;

		// Try to find a controller in the hooks
		if (typeof hooks[url] != 'undefined') {
			app.log.debug('Routed to controller [' + url + ']');
			app.controller = new hooks[url]();
		} else {
			app.log.warning('Controller [' + url + '] not found');
			
			if (errorHandler) {
				app.controller = new errorHandler();
			}
		}
	};
};