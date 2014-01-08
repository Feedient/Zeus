![Zeus by Feedient](http://i.imgur.com/acr0YmB.png)
#### Single Page Application Framework

***
### Browser requirements
[HTML5 History](http://caniuse.com/history)
- Internet Explorer >= 10
- Android Browser >= 4.2
- iOS Safari >= 4.2

### Installation
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

### Framework events
You can listen for certain events during the Zeus lifecycle, using jQuery/Zepto events.

#### 1. ZeusLoaded
Triggered after Zeus core, libraries, helpers and controllers have been loaded.

```javascript
$(window).on('ZeusLoaded', function() {
	...
});
```

#### 2. ZeusReady
Triggered after ZeusLoaded has been triggered, and all views have been preloaded.

```javascript
$(window).on('ZeusReady', function() {
	...
});
```

### Loading any file or component
Please add your file path to the appropriate config array, such as `libraries` in `app/config.js`. You may emit the .js extension, since [require.js](http://requirejs.org) adds that automatically.

### Controllers
Controllers are located in `app/controllers/*.js` and are supposed to listen for a specific URL and respond appropriately, with a view or certain action.

```javascript
app.core.router.get('/page', function() {
   // Render the view app/views/page.html and output it at #main
   app.view.render('page', { name: 'Jesper' }, '#main');
});
```

The third argument of `app.core.view.render()` which is the CSS selector, is optional and defaults to `#main`. It also accepts a callback function with one argument, which will contain the rendered HTML. If you want to do something after the view has loaded, you can pass a callback function (without any arguments) as the fourth argument.

### Views
Views are located in `app/views/*.html` and contain [Handlebars](http://handlebarsjs.com) templates. Below is a view that together with the controller above, would output "Hello, my name is Jesper" to any element with id="main".

```html
Hello, my name is {{name}}
```

### Libraries
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

### Helpers
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