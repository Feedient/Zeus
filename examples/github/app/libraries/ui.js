app.lib.ui = function() {
	/**
	 * Set the active state of menu links
	 * @param String page
	 */
	this.setActive = function(page) {
		$('.active').removeClass('active');

		if (page) {
			$('#' + page + '-link').addClass('active');
		}
	};
};