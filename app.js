const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const socketio = require('socket.io');
const routes = require('./routes');

// Logging middleware
app.use(function (req, res, next) {
  /* Since this hasn't reached a GET yet, req.statusCode returns null. 
   * Obviously, the easiest solution is to use Morgan, but since this 
   * project is for the sake of learning/practice: How do I solve this
   * problem manually?
   */
  let output = [req.method, req.url, req.statusCode];
  console.log(output.join(' '));
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* app.set essentially assigns the second parameter as an attribute, 
 * with the first parameter as the variable name within express' namespace.
 * In this case, html is set as the default extension that express searches
 * for when no extension is given
 */
app.set('view engine', 'html'); 
// app.engine designates a templating engine for a given extension.
app.engine('html', nunjucks.render); 
/* nunjucks.configure designates the given directory path as the place
 * to search for templates.  The second parameter, if provided, sets options 
 */
nunjucks.configure('views', {noCache: true}); 
/* For a given requested path, ('/' is the default if omitted), app.use 
 * executes the given function. Here, the router (whose functionalities 
 * are defined in routes/index.js) is imported and assigned to execute
 * whenever '/' is requested with any verb.  Socket.io allows WebSockets
 * to function on the server.
 */
var server = app.listen(3000, function () {
  console.log('\'Twitter Solo\' app listening on port 3000');
});
var io = socketio.listen(server);
app.use('/', routes(io)); 
