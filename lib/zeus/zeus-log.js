'use strict';

if (!console) {
	var console = {
		log: function() { }
	};
}

window.log = function() {
	console.log('\n\n');

	this.debug = function(message) {
		if (app.config.logLevel >= 3) {
			console.log('[Debug] ' + message);
		}
	};

	this.warning = function(message) {
		if (app.config.logLevel >= 2) {
			console.log('%c[Warning] ' + message, 'background-color: #DF5500; color: #fff; font-weight:bold;');
		}
	};

	this.error = function(message) {
		if (app.config.logLevel >= 1) {
			console.log('%c[Error] ' + message, 'background-color: #ff0000; color: #fff; font-weight:bold;');
		}		
	};
};