app.core.hooks = function() {
	'use strict';

	var hooks = {};

	/**
	 * Listen for a hook
	 * @param String identifier
	 * @param Function callback
	 */
	this.on = function(identifier, callback) {
		if (!hooks[identifier]) hooks[identifier] = [];

		hooks[identifier].push(callback);
	};

	/**
	 * Trigger a hook
	 * @param String identifier
	 * @param Object data / Function callback
	 * @param Function callback
	 */
	this.trigger = function(identifier, data, callback) {
		if (!callback && typeof data == 'function') {
			var callback = data;
			var data = null;
		}

		if (!hooks[identifier] || !hooks[identifier].length) {
			callback();
			return;
		}

		var hookListeners = hooks[identifier].slice(); // Copy the array

		for (var i in hookListeners) {
			hookListeners[i] = async.apply(hookListeners[i], data);
		}

		async.series(hookListeners, function() {
			if (callback) callback();
		}); 
	};
};