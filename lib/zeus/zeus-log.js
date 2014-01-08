'use strict';

if (!console) {
	var console = {
		log: function() { }
	};
}

window.log = {};

console.log('\n\n');

window.log.debug = function(message) {
    if (app.config.logLevel >= 3) {
        console.log('[Debug] ' + message);
    }
};

window.log.warning = function(message) {
    if (app.config.logLevel >= 2) {
        console.log('%c[Warning] ' + message, 'background-color: #DF5500; color: #fff; font-weight:bold;');
    }
};

window.log.error = function(message) {
    if (app.config.logLevel >= 1) {
        console.log('%c[Error] ' + message, 'background-color: #ff0000; color: #fff; font-weight:bold;');
    }		
};