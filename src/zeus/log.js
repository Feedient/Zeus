// Prevent retarded browsers from doing retarded stuff :)
if (!console) {
	var console = {
		log: function() { }
	};
}

app.core.log = function() {
	'use strict';
	
	var self = this;

	/**
	 * Log a debug message (log level 3)
	 * @param String message
	 */
	this.debug = function(message) {
		if (app.config.logLevel >= 3) {
			console.log('[Debug] ' + message);
		}
	};
	
	/**
	 * Log a warning message (log level 2)
	 * @param String message
	 */
	this.warning = function(message) {
		if (app.config.logLevel >= 2) {
			console.log('%c[Warning] ' + message, 'background-color: #DF5500; color: #fff; font-weight:bold;');
		}
	};
	
	/**
	 * Log an error message (log level 1)
	 * @param String message
	 */
	this.error = function(message) {
		if (app.config.logLevel >= 1) {
			console.log('%c[Error] ' + message, 'background-color: #ff0000; color: #fff; font-weight:bold;');
		}		
	};
};