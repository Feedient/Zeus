'use strict';

window.app = {};
window.app.providers = {};

/**
 * On INIT, load all the files
 */
$(function() {
	require(['app/config'], function() {
        loadConfig("core", app.config.core, function() {
            loadConfig("helpers", app.config.helpers, function() {
                console.log(app);
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
        
        // For Each file, get the name and save the function
//        configKey.forEach(function(filePath) {
//            // Get the last part of the url, this is the file name
//            var fileParts = filePath.split('/');
//            var file = fileParts[fileParts.length - 1];
//            
//            // Save the file
//            app[file] = new app[file]();
//            
//        });
        
        return callback();
    });
};

var triggerDoneLoading = function() {
    $(window).trigger('frameworkReady');
    
    // When done loading the framework, call the onFrameworkInit hook
    for (var i in app.core) {
        console.log(i);
        if (app.core[i].onFrameworkInit) {
        app.core[i].onFrameworkInit();    
        }
    };
    
};
//
//var loadConfig = function(configName, configKey, callback) {
//    var array = {};
//    console.log(configKey);
//    // Load the specified configKey files
//    require(configKey, function () {
//        // For each file registered
//        configKey.forEach(function(filePath) {
//            console.log(filePath);
//            // Split the path by / to get each folder/file
//            var fileParts = filePath.split('/');
//    
//            // Get the file name from the path
//            var file = fileParts[fileParts.length - 1];
//
//            if (!app[configName][file]) {
//                array.push(new app[configName][file]());
//            } else if(app.providers[file]) {
//                app.providers[file] = app.providers[file]();
//            }
//        });
//        
//        console.log(app);
//        console.log(array);
//        return array;
//    });
//};