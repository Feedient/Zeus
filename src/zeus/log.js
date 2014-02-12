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
	 * @param String namespace (optional)
	 */
	this.debug = function(message, namespace) {
		if (app.config.logLevel >= 3) {
			if (!namespace) var namespace = 'Unknown';
			
			console.log('%c[' + namespace + ']%c ' + message, 'font-weight:bold;color:blue;', 'font-weight:normal;');
		}
	};
	
	/**
	 * Log a warning message (log level 2)
	 * @param String message
	 * @param String namespace (optional)
	 */
	this.warning = function(message, namespace) {
		if (app.config.logLevel >= 2) {
			if (!namespace) var namespace = 'Unknown';
			
			console.warn('[' + namespace + '] ' + message);
		}
	};
	
	/**
	 * Log an error message (log level 1)
	 * @param String message
	 * @param String namespace (optional)
	 */
	this.error = function(message, namespace) {
		if (app.config.logLevel >= 1) {
			if (!namespace) var namespace = 'Unknown';
			
			console.error('[' + namespace + '] ' + message);
		}		
	};

	console.log('%c======= Powered by Zeus =======', 'color:#1ead91;font-weight:bold;');
};