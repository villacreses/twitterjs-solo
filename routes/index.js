const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');

/* The router built in this file is imported into the app.js file; there,
 * it is given the reponsibility of handling all requests matching the
 * given parameter in app.js's calling of app.use
 */
module.exports = function (io) {
  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render('index', {tweets: tweets, showForm: true});
  });

  /* ============================================================
   * REMEMBER: Please DO NOT forget that, for your purposes, every single GET 
   * query route must begin with a '/'.  Remember how forgetting to do so 
   * absolutely drained your time during the Express checkpoint.
   * ============================================================
   */
  const path = require('path');
  router.get('/stylesheets/style.css', function (req, res) {
    res.sendFile(path.dirname(__dirname) + req.url);
  });
  /* The preceding GET may be simple, but having to write such routes for 
   * absolutely every possible public file would be overkill.  The function
   * 'express.static(ROOT)' can be used as middleware (just like the logging
   * middleware) to serve a static file from the ROOT directory
   */

  router.get('/users/:name', function (req, res) {
    let name = req.params.name;
    let list = tweetBank.find({name: name});
    res.render('index', {tweets: list, showForm: true, username: name});
  });

  router.get('/tweets/:id', function (req, res) {
    let tweets = tweetBank.find({id: parseInt(req.params.id)});
    res.render('index', {tweets: tweets, showForm: false});
  });

  /* The <form> tag in views/index.html has the attributes 'action' and 
   * 'method'; the former is the HTTP request, the latter is the method 
   * designated to handle the request.
   */
  router.post('/tweets', function (req, res) {
    let newTweet = tweetBank.add(req.body.name, req.body.text);
    io.sockets.emit('newTweet', newTweet);

    res.redirect('/');
    // This last line makes a new GET request towards the main page
  });

  return router;
};
