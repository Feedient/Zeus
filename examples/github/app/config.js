app.config = {

	// Log level, between 0-3 where 3 is all messages and 0 is none
	logLevel: 3,
   
    // Core => window.app.core
    core: [
        'lib/zeus/log',
        'lib/zeus/view',
        'lib/zeus/router',
        'lib/zeus/api'    
    ],
    
    // Helper files => window.app.helpers
    helpers: [
        // Helpers
        'app/helpers/timeAgo'
    ],

	// Controller files
	controllers: [
		'app/controllers/index',
		'app/controllers/list',
		'app/controllers/repos',
		'app/controllers/404'
	],

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
	path: '/admin',

	// API server URL
	API: 'https://api.github.com'
};