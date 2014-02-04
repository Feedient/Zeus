'use strict';

app.core.router = function () { 
	var hooks = {};
	var self = this;
	var errorHandler = false;

	this.active = false;
	
	/**
	 * Click listener for links
	 * @param Event event
	 */
	var handleClick = function (event) {
		// Get the URL
		var link = $(this).attr('href');
		
		if (link && link !== 'javascript:void(0)') {
			// Load the page
			self.routeTo(link);
	
			// Send it to the browser history
			history.pushState('', '', link);
	
			// Prevent site from refreshing
			event.preventDefault();
		}
	};
	
	/**
	 * Assign click listeners to all internal links
	 */
	this.assignEvents = function () {
		if (history.pushState) {
			// Assign AJAX loading behavior
			$('a').each(function () {
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
	this.error = function (callback) {
		errorHandler = callback;
	};
	
	/**
	 * Attach a controller to an URL
	 * @param String call
	 * @param Function object
	 */
	this.get = function (call, object) {
		hooks[call] = object;
	};
	
	/**
	 * Load an URL from the hooked controllers
	 * @param String url
	 */
	this.routeTo = function (url) {
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
	
		self.active = url;

		// Try to find a controller in the hooks
		if (typeof hooks[url] != 'undefined') {
			app.core.log.debug('Routed to controller [' + url + ']');
			window.app.controller = new hooks[url]();
		} else {
			app.core.log.warning('Controller [' + url + '] not found');
			
			if (errorHandler) {
				window.app.controller = new errorHandler();
			}
		}

		$(window).trigger('ZeusRoute', self.active);
	};

	/**
	 * Load the default controller
	 */
	$(window).on('ZeusReady', function() {
		// Check for HTML5 pushState support
		if (history.pushState) {
			app.core.log.debug('Initialized router');

			$(window).bind('popstate', function() {
				window.app.core.router.routeTo(window.location.pathname);
			});
	
			self.assignEvents();

			if (app.config.preRouteHook) {
				(eval(app.config.preRouteHook))(function() {
					self.routeTo(window.location.pathname);
				});

				return;
			}

			self.routeTo(window.location.pathname);
		}
	});
};