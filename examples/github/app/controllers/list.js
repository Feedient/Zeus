app.core.router.get('/list', function() {
	// Change active state
	app.lib.ui.setActive('list');

	// Example data
	var data = {
		items: [
			{ text: 'Item 1', timestamp: 'Sun Jan 05 2014 15:09:31 GMT+0100 (CET)'},
			{ text: 'Item 2', timestamp: 'Mon Jan 07 2013 00:00:00 GMT+0100 (CET)'},
			{ text: 'Item 3', timestamp: 'Sun Mar 10 2013 13:37:00 GMT+0100 (CET)'},
			{ text: 'Item 4', timestamp: 'Wed Jul 17 2013 14:37:00 GMT+0200 (CEST)'},
			{ text: 'Item 5', timestamp: 'Sun Mar 10 1996 13:37:00 GMT+0100 (CET)'}
		]
	};

	// Sort the items by timestamp, newest first
	data.items.sort = function(a, b) {
		return new Date(a.timestamp).getTime() > new Date(b.timestamp).getTime();
	};

	// We need to tell the view engine to load the partials/list-item view partial as {{> listItem}}
	data.partials = {
		listItem: 'partials/list-item'
	};

	// Render views/list.html to #main
	app.core.view.render('list', data);
});