![Zeus by Feedient](http://i.imgur.com/acr0YmB.png)
#### Single Page Application Framework
***

## Browser requirements
[HTML5 History](http://caniuse.com/history)
- Internet Explorer >= 10
- Android Browser >= 4.2
- iOS Safari >= 4.2

## Dependencies
- [Async.js](https://github.com/caolan/async/)
- [jQuery](http://jquery.com) **or** [Zepto.js](http://zeptojs.com/)
- [Handlebars.js](https://github.com/wycats/handlebars.js/)
- [Require.js](http://requirejs.org/)

## Installation
1. Clone or download this repository.
2. Move it to your web server's public path (such as www, htdocs or public_html)

3. Edit the base path in `index.html` if you host it in a sub folder:
```html
<base href="/path/to/my/app/">
```
Also edit the base path in `app/config.js` if you host it in a sub folder:
```javascript
// Path without trailing slash
path: '/path/to/my/app',
```

*Make sure to set your 404 error document to "index.html" in your web server. A `.htaccess` for Apache is included in the repository.*

**Done!**

## Loading any file or component
Please add your file path to the appropriate `autoLoad` section, such as `lib`, in `app/config.js`. You may emit the .js extension, since [Require.js](http://requirejs.org) adds that automatically.

## Controllers
Controllers are located in `app/controllers/*.js` and are supposed to listen for a specific URL and respond appropriately, with a view or certain action. [Read more](https://github.com/Feedient/Zeus/wiki/Controllers)

## Views
Views are located in `app/views/*.html` and contain [Handlebars](http://handlebarsjs.com) templates. [Read more](https://github.com/Feedient/Zeus/wiki/Views)

## Libraries
Libraries are located in `app/libraries/*.js` and provide functionality either by directly performing actions or by providing public methods, that controllers can access. [Read more](https://github.com/Feedient/Zeus/wiki/Libraries)

## Services
Services are simply data providers or managers. Instead of calling the API server directly from your controller or library, you should call the API via a service. Your controllers and libraries may use data from the API, but they should not take care of how to obtain it – that's for the service. [Read more](https://github.com/Feedient/Zeus/wiki/Services)

## Helpers
Helpers are located in `app/helpers/*.js` and are merely simple functions that do basic things such as formatting data. In our example application, `app.helpers.timeAgo(timestamp)` is a helper that converts a date string into relative time (like "5h ago"). [Read more](https://github.com/Feedient/Zeus/wiki/Helpers)

## [Core] System hooks
What we call "System hooks" is a way to "hook into" the Zeus lifecycle and execute certain code that has the power to stop the entire Zeus app from further execution/loading. [Read more](https://github.com/Feedient/Zeus/wiki/%5BCore%5D-System-hooks)

## [Core] API library
Zeus ships with a handy library for performing API calls via AJAX. You are required to set your API server's base URL in `app/config.js`, as the property named `API`. [Read more](https://github.com/Feedient/Zeus/wiki/%5BCore%5D-API)

## [Core] Cache library
To make sure your single page application is fast and responsive to the user, it's a good idea to cache data, especially if it's retrieved from a slow API server. Zeus provide basic caching through in-memory storage for visit-long storage capabilities. [Read more](https://github.com/Feedient/Zeus/wiki/%5BCore%5D-Cache)


## [Core] Localization (i18n)
Feedient ships with a lightweight but powerful localization system, available at `app.core.i18n` and through `{{i18n '...'}}` Handlebars helper. [Read more](https://github.com/Feedient/Zeus/wiki/%5BCore%5D-Localization-(i18n))
