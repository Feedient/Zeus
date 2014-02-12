app.config = {

	// Log level, between 0-3 where 3 is all messages and 0 is none
	logLevel: 3,

	autoLoad: {
		// Core => app.core.*
		core: [
			'lib/zeus/hooks',
			'lib/zeus/log',
			'lib/zeus/view',
			'lib/zeus/router',
			'lib/zeus/api'
		],
		
		// Libraries => app.lib.*
		lib: [
			'app/libraries/ui'
		],

		// Helpers => app.helpers.*
		helpers:  {
			initialize: false,
			files: [
				'app/helpers/timeAgo'
			]
		},

		// Controllers => app.core.router.get(...)
		controllers: {
			initialize: false,
			files: [
				'app/controllers/index',
				'app/controllers/list',
				'app/controllers/repos',
				'app/controllers/404'
			]
		},

		setup: {
			initialize: false,
			files: [
				'app/setup'
			]
		}
	},

	// Optionally preload common views
	preloadViews: [
		'index',
		'list'
	],

	// Optionally preload common partials
	preloadViewPartials: {
		// listItem: 'partials/list-item'
	},

	// Control how many GET requests may be sent at once by the view preloader
	parallelLimit: 5,

	// Path without trailing slash
	path: '',

	// View engine settings
	viewEngine: {
		defaultSelector: '#main',
		fileExtension: 'html'
	},

	// API server URL
	API: 'https://api.github.com'
};