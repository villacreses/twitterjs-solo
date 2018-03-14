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

app.get('/', function (req, res) {
  res.send('Hello world!');
});

app.listen(3000, function () {
  console.log('\'Twitter Solo\' app listening on port 3000');
});
