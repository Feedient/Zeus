app.lib.ui = function() {
	/**
	 * Set the active state of menu links
	 * @param Object data
	 * @param Function next
	 */
	var setActiveLink = function(data, next) {
		var url = data.path;

		if (url == '/') {
			// Recognize / as ./
			url = './';
		} else {
			// Remove the slash in the beginning
			url = url.substr(1);
		}

		// Remove the old active link, if any
		$('.active').removeClass();

		// Add the active state to the link with the correct URL
		$('#menu [href="' + url + '"]').parent().addClass('active');

		next();
	};

	// Listen for the route sytem hook
	app.core.hooks.on('route', setActiveLink);
};