'use strict';

app.core.view = function () {
    var viewCache = {};
    
    /**
     * Load the required partials
     * @param Array partials
     * @param Function callback
     */
    var loadPartials = function (partials, callback) {
        if (!partials) {
            return callback();
        }
    
        var loadFunctions = [];
    
        for (var i in partials) {
            loadFunctions.push(function(parallelCallback) {
                // Is the view cached?
                if (viewCache[partials[i]]) {
                    app.core.log.debug('Registered partial from cache [' + i + ' => ' + partials[i] + ']');
                    Handlebars.registerPartial(i, viewCache[partials[i]]);
        
                    return parallelCallback();
                }
        
                // Load the view file
                $.get(app.config.path + '/app/views/' + partials[i] + '.html', function(source) {
                    app.core.log.debug('Registered partial [' + i + ' => ' + partials[i] + ']');
                    viewCache[partials[i]] = Handlebars.compile(source);
                    Handlebars.registerPartial(i, viewCache[partials[i]]);
                    parallelCallback();
                });
            });
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
            app.core.log.debug('Compiled view [' + file + ']')
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
    
    this.onFrameworkInit = function() {
        // Preload all views	
        this.preload(function() {
            // Load the controllers and then start the router
            require(app.config.controllers, app.core.router.initialize);
        });
    };
    
    /**
     * Render a view template
     * @param String file
     * @param Array data
     * @param Function callback
     * @param Function thenCallback
     */
    this.render = function(file, data, callback, thenCallback) {
        if (!callback) var callback = '#main';
        
        if (viewCache[file]) {
            app.core.log.debug('Loaded view [' + file + '] from cache');
            compileView(file, viewCache[file], data, callback, thenCallback);
        } else {
            $.get(app.config.path + '/app/views/' + file + '.html', function(source) {
                app.core.log.debug('Loaded view [' + file + ']');
                compileView(file, source, data, callback, thenCallback);
            });
        }
    };
    
    /**
     * Preload and cache compiled view files
     */
    this.preload = function(callback) {
        var preloadFunctions = [];
    
        // Loop through all requested files
        app.config.preloadViews.forEach(function(file) {
            // Add a loading function to the preloadFunctions array
            preloadFunctions.push(function(callback) {
                // Load the view html file
                $.get(app.config.path + '/app/views/' + file + '.html', function(source) {
                    app.core.log.debug('Preloaded view [' + file + ']');
    
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
                        app.core.log.debug('Registered partial [' + key + ' => ' + app.config.preloadViewPartials[key] + ']');
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
};