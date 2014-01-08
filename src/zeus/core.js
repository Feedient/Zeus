'use strict';

window.app = {};

/**
 * On INIT, load all the files
 */
$(function() {
	require(['app/config'], function() {
        loadConfig("core", app.config.core, function() {
            loadConfig("helpers", app.config.helpers, function() {
                triggerDoneLoading(); 
            });
        });
	});
});

var loadConfig = function(configName, configKey, callback) {
    // Create a key to store them
    if (!app[configName]) app[configName] = {};
    
    // Load the files
    require(configKey, function() {
        // Callback if done loading.
        return callback();
    });
};

var triggerDoneLoading = function() {
    $(window).trigger('frameworkReady');
    
    // When done loading the framework, call the onFrameworkInit hook
    for (var i in app.core) {
        if (app.core[i].onFrameworkInit) {
            app.core[i].onFrameworkInit();    
        }
    };
};