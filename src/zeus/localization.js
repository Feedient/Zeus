app.core.localization = function() {
	var isLoaded = false;
	var locale = app.config.localization.defaultLocale;
	var localeData = {};

	/**
	 * Change the locale
	 * @param String newLocale
	 */
	this.setLocale = function(newLocale) {
		// Prevent change after files have been loaded
		if (isLoaded) {
			app.core.log.warning('Locale may not be changed after files have been loaded. Locale change should occur in the "loaded" hook.', 'Zeus/Localization');
			return;
		}

		// Make sure locale is supported
		if (app.config.localization.locales.indexOf(newLocale) == -1) {
			app.core.log.warning('Locale ' + newLocale + ' does not exist in app.config.localization.locales', 'Zeus/Localization');
			return;
		}

		locale = newLocale;
	};

	/**
	 * Load all specified locale files and parse their content
	 */
	var loadFiles = function() {
		// Make sure there are files to load
		if (!app.config.localization.files.length) {
			app.core.log.warning('No locale files to be loaded', 'Zeus/Localization');
			return;
		}

		// Loop through the file list
		for (var i in app.config.localization.files) {
			// ...
		}
	};
};