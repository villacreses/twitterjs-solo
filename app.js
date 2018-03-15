const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

app.use(function (req, res, next) {
  /* Since this hasn't reached a GET yet, req.statusCode returns null. 
   * Obviously, the easiest solution is to use Morgan, but since this 
   * project is for the sake of learning/practice: How do I solve this
   * problem manually?
   */
  let output = [req.method, req.url, req.statusCode];
  console.log(output);
  next();
});

app.set('view engine', 'html'); // Have res.render work with html files
app.engine('html', nunjucks.render); // res.render uses nunjucks for html files
nunjucks.configure('views', {noCache: true}); // point nunjucks to the designated template directory

var locals = {
  title: 'An Example',
  people: [
    { name: 'Gandalf' },
    { name: 'Frodo' },
    { name: 'Hermione' }
  ]
};

//nunjucks.render('index.html', locals, function (err, output) {
//  console.log(output);
//});

app.get('/', function (req, res) {
  // res.send('Hello world!');
  res.render('index', locals); // use the Nunjucks templating docs to see what else you can send
});

app.listen(3000, function () {
  console.log('\'Twitter Solo\' app listening on port 3000');
});
