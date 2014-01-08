'use strict';

window.router = {};

var hooks = {};
var errorHandler = false;
    
window.router.active = false;

/**
 * Load the default controller
 */
window.router.initialize = function() {
    // Check for HTML5 pushState support
    if (history.pushState) {
        window.log.debug('Initialized router');
        $(window).bind('popstate', function() {
            window.router.routeTo(window.location.pathname);
        });

        window.router.assignEvents();
        window.router.routeTo(window.location.pathname);
    }
};

/**
 * Click listener for links
 * @param Event event
 */
var handleClick = function(event) {
    // Get the URL
    var link = $(this).attr('href');
    
    if(link && link !== 'javascript:void(0)') {
        // Load the page
        window.router.routeTo(link);

        // Send it to the browser history
        history.pushState('', '', link);

        // Prevent site from refreshing
        event.preventDefault();
    }
};


/**
 * Assign click listeners to all internal links
 */
window.router.assignEvents = function() {
    if (history.pushState) {
        // Assign AJAX loading behavior
        $('a').each(function() {
            var element = $(this);

            // Make sure it has not been assigned already and is not an external link
            if (element.attr('data-hasevents') != '1' 
            && element.attr('target') != '_blank'
            && !/http(s)?:\/\//.test(element.attr('href'))
            && element.attr('data-direct') != '1') {
                element.attr('data-hasevents', '1');

                element.on('click', handleClick);
            }
        });
    }
};

/**
 * Listen for 404 errors
 * @param Function callback
 */
window.router.error = function(callback) {
    errorHandler = callback;
};

/**
 * Attach a controller to an URL
 * @param String call
 * @param Function object
 */
window.router.get = function(call, object) {
    hooks[call] = object;
};

/**
 * Load an URL from the hooked controllers
 * @param String url
 */
window.router.routeTo = function(url) {
    // Remove the base path from the URL
    url = url.replace(app.config.path, '');

    // Rewrite ./ to /
    if (/^\.\/$/.test(url)) {
        url = '/';
    }

    // Force / in the beginning of URL
    if (!/^\//.test(url)) {
        url = '/' + url;
    }

    // Remove / from the end
    if (url != '/' && /\/$/.test(url)) {
        url = url.substr(0, url.length - 1);
    }

    window.router.active = url;

    // Try to find a controller in the hooks
    if (typeof hooks[url] != 'undefined') {
        window.log.debug('Routed to controller [' + url + ']');
        window.controller = new hooks[url]();
    } else {
        window.log.warning('Controller [' + url + '] not found');
        
        if (errorHandler) {
            window.controller = new errorHandler();
        }
    }
};
