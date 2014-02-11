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
		if (!callback) var callback = data;

		if (!hooks[identifier] || !hooks[identifier].length) {
			callback();
			return;
		}

		// ...
	};
};