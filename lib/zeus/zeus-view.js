'use strict';

// Init the window.view
window.view = {};

var viewCache = {};

/**
 * Load the required partials
 * @param Array partials
 * @param Function callback
 */
var loadPartials = function(partials, callback) {
    if (!partials) return callback();

    var loadFunctions = [];

    for (var i in partials) {
        (function() {
            var key = i;

            loadFunctions.push(function(parallelCallback) {
                // Is the view cached?
                if (viewCache[partials[key]]) {
                    app.log.debug('Registered partial from cache [' + key + ' => ' + partials[key] + ']');
                    Handlebars.registerPartial(key, viewCache[partials[key]]);

                    return parallelCallback();
                }

                // Load the view file
                $.get(app.config.path + '/app/views/' + partials[key] + '.html', function(source) {
                    app.log.debug('Registered partial [' + key + ' => ' + partials[key] + ']');
                    viewCache[partials[key]] = Handlebars.compile(source);
                    Handlebars.registerPartial(key, viewCache[partials[key]]);
                    parallelCallback();
                });
            });
        }());
    };

    // Load the above functions in parallel
    async.parallelLimit(loadFunctions, app.config.parallelLimit, callback);
};

/**
 * Compile and output or pass along the template to the callback
 * @param String source
 * @param Array data
 * @param Mixed callback CSS selector or callback
 * @param Function thenCallback
 */
var compileView = function(file, source, data, callback, thenCallback) {
    if (typeof source === 'string') {
        app.log.debug('Compiled view [' + file + ']')
        viewCache[file] = Handlebars.compile(source);
    }

    loadPartials(data.partials, function() {
        // Remove the partial options before passing the data to the view
        delete data.partials;

        var template = viewCache[file](data);

        if (typeof callback === 'string') {
            $(callback).html(template);
            if (thenCallback) thenCallback(callback);
        } else {
            callback(template);
        }
    });
};

/**
 * Render a view template
 * @param String file
 * @param Array data
 * @param Function callback
 * @param Function thenCallback
 */
window.view.render = function(file, data, callback, thenCallback) {
    if (!callback) var callback = '#main';
    
    if (viewCache[file]) {
        app.log.debug('Loaded view [' + file + '] from cache');
        compileView(file, viewCache[file], data, callback, thenCallback);
    } else {
        $.get(app.config.path + '/app/views/' + file + '.html', function(source) {
            app.log.debug('Loaded view [' + file + ']');
            compileView(file, source, data, callback, thenCallback);
        });
    }
};

/**
 * Preload and cache compiled view files
 */
window.view.preload = function(callback) {
    var preloadFunctions = [];

    // Loop through all requested files
    app.config.preloadViews.forEach(function(file) {
        // Add a loading function to the preloadFunctions array
        preloadFunctions.push(function(callback) {
            // Load the view html file
            $.get(app.config.path + '/app/views/' + file + '.html', function(source) {
                app.log.debug('Preloaded view [' + file + ']');

                // Compile and cache the view
                compileView(file, source, false, callback);
            });
        });
    });

    for (var i in app.config.preloadViewPartials) {
        (function() {
            var key = i;

            preloadFunctions.push(function(callback) {
                $.get(app.config.path + '/app/views/' + app.config.preloadViewPartials[key] + '.html', function(source) {
                    app.log.debug('Registered partial [' + key + ' => ' + app.config.preloadViewPartials[key] + ']');
                    Handlebars.registerPartial(key, Handlebars.compile(source));
                    callback();
                });
            });
        }());
    };

    // Load the above functions in parallel
    async.parallelLimit(preloadFunctions, app.config.parallelLimit, function(err, results) {
        callback();
    });
};