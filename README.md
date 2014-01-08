![Zeus by Feedient](http://i.imgur.com/acr0YmB.png)
#### Single Page Application Framework

See example for reference.

***
### Requirements
Internet Explorer > 9.0
Firefox > 25.0

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

5. Done!

### Hooks
Zeus got hooks that you can use when developing libraries.
- onInitFramework() // Gets called when the framework is done loading.

### Loading any file or component
Please add your file path to the `config.system` or `config.controllers` arrays in `app/config.js`. You may emit the .js extension, since [require.js](http://requirejs.org) adds that automatically.

### Controllers
Controllers are located in `app/controllers/*.js` and are supposed to listen for a specific URL and respond appropriately, with a view or certain action.

```javascript
app.router.get('/page', function() {
   // Render the view app/views/page.html and output it at #main
   app.view.render('page', { name: 'Jesper' }, '#main');
});
```

The third argument of `app.view.render()` which is the CSS selector, is optional and defaults to `#main`. It also accepts a callback function with one argument, which will contain the rendered HTML. If you want to do something after the view has loaded, you can pass a callback function (without any arguments) as the fourth argument.

### Views
Views are located in `app/views/*.html` and contain [Handlebars](http://handlebarsjs.com) templates. Below is a view that together with the controller above, would output "Hello, my name is Jesper" to any element with id="main".

```html
Hello, my name is {{name}}
```

### Libraries
Libraries are located in `app/libraries/*.js` and provide functionality either by directly performing actions (such as the router library) or by providing public methods, that controllers can access. Controllers would be able to access the following method below via `app.myLibrary.myPublicMethod()`.

```javascript
app.myLibrary = function() {
    var myPrivateMethod = function() {
        return 'Hello world';
    };

    this.myPublicMethod = function() {
        alert('Hello world');
    };
};
```
