app.lib.cache = function() {
	var data = {};

	/**
	 * Get a certain cache object
	 * @param String key
	 * @return Mixed
	 */ 
	this.get = function(key) {
		if (data[key] && new Date() >= data[key].expiration) {
			return data[key].value;
		}

		return false;
	};

	/**
	 * Add data to the cache
	 * @param String key
	 * @param Mixed value
	 * @param Int expiration
	 */
	this.add = function(key, value, expiration) {
		if (!data[key]) data[key] = {};

		// Calculate expiration date
		var date = new Date();
		date.setTime(date.getTime() + expiration*1000);

		// Store expiration and value
		data[key].expiration = date;
		data[key].value = value;
	};

	/**
	 * Check if a certain key is in the cache
	 * @param String key
	 */
	this.has = function(key) {
		return data[key] && new Date() >= data[key].expiration;
	};

	/**
	 * Remove a certain cache object
	 * @param String key
	 */
	this.remove = function(key) {
		if (data[key]) delete data[key];
	};
};