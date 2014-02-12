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

4. Also the base path in `app/config.js` if you host it in a sub folder:
```javascript
// Path without trailing slash
path: '/path/to/my/app',
```

5. Make sure to set your 404 error document to "index.html" in your web server. A `.htaccess` for Apache is included in the repository.

6. Done!

## Loading any file or component
Please add your file path to the appropriate `autoLoad` section, such as `lib`, in `app/config.js`. You may emit the .js extension, since [Require.js](http://requirejs.org) adds that automatically.

## Controllers
Controllers are located in `app/controllers/*.js` and are supposed to listen for a specific URL and respond appropriately, with a view or certain action.

```javascript
app.core.router.get('/page', function() {
   // Render the view app/views/page.html and output it at #main
   app.core.view.render('page', { name: 'Jesper' }, '#main');
});
```

The third argument of `app.core.view.render()` which is the CSS selector, is optional and defaults to `#main`. It also accepts a callback function with one argument, which will contain the rendered HTML. If you want to do something after the view has loaded, you can pass a callback function (without any arguments) as the fourth argument.

## Views
Views are located in `app/views/*.html` and contain [Handlebars](http://handlebarsjs.com) templates. Below is a view that together with the controller above, would output "Hello, my name is Jesper" to any element with id="main".

```html
Hello, my name is {{name}}
```

## Libraries
Libraries are located in `app/libraries/*.js` and provide functionality either by directly performing actions or by providing public methods, that controllers can access. Controllers would be able to access the following method below via `app.lib.myLibrary.myPublicMethod()`.

```javascript
app.lib.myLibrary = function() {
    var myPrivateMethod = function() {
        return 'Hello world';
    };

    this.myPublicMethod = function() {
        alert('Hello world');
    };
};
```

## Helpers
Helpers are located in `app/helpers/*.js` and are merely simple functions that do basic things such as formatting data. In our example application, `app.helpers.timeAgo(timestamp)` is a helper that converts a date string into relative time (like "5h ago"). 

```javascript
app.helpers.myHelper = function(text) {
	// Do something with text

    return text;
};
```

Helpers may also register themselves as Handlebars helpers, accessed via `{{myHelper 'Example text'}}` in Handlebars templates.
```javascript
Handlebars.registerHelper('myHelper', app.helpers.myHelper);
```

## System hooks
What we call "System hooks" is a way to "hook into" the Zeus lifecycle and execute certain code that has the power to stop the entire Zeus app from further execution/loading. [Read more](https://github.com/Feedient/Zeus/wiki/System-hooks)

## API library
Zeus ships with a handy library for performing API calls via AJAX. You are required to set your API server's base URL in `app/config.js`, as the property named `API`. The API library is accessed via `app.core.api` and provides the following methods.

#### app.core.api.{HTTP VERB}(...)
Perform GET, POST, PUT or DELETE requests. Response data is obtained from the callback which takes only the response data as argument. All HTTP verbs but GET optionally accept a second argument that is a key-value object of data.

If the response is of type application/json, it will be automatically parsed as JSON.

- app.core.api.get(path, callback)
- app.core.api.post(path, data, callback)
- app.core.api.put(path, data, callback)
- app.core.api.delete(path, data, callback)

```javascript
var bookData = {
    title: 'Harry Potter',
    author: 'J.K. Rowling'
};

app.core.api.post('/books', bookData, function(response) {
    // do something with response
});
```

#### app.core.api.addHeader(key, value)
Add a custom HTTP header to every API call. Value may be a string or a refernce to a function that returns a string. If it's a function, the function will be called before every request, thus making sure the value is always up to date.

```javascript
app.core.api.addHeader('user-token', app.lib.user.getToken);
```

#### app.core.api.onError(callback)
Listen for failed API requests. Callback takes one argument that is the HTTP status code.

#### app.core.api.onSuccess(callback)
Listen for successful API requests. Your callback takes two arguments: the request response and the real success callback. **You must pass the request response along to the success callback.** Using this method, you may check for errors in the API response or similar. 

```javascript
app.core.api.onSuccess(function(data, successCallback) {
    // Authentication error
    if (data.error.type == 'AUTH_ERROR') {
        // Stop and show the error page
        app.core.view.render('error');
        return;
    }
    
    successCallback(data);
});
```