const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');
const client = require('../db');

/* The router built in this file is imported into the app.js file; there,
 * it is given the reponsibility of handling all requests matching the
 * given parameter in app.js's calling of app.use
 */
module.exports = function (io) {
  router.get('/', function (req, res) {
    //let tweets = tweetBank.list();
    //res.render('index', {tweets: tweets, showForm: true});
    client.query('SELECT tweets.id AS id, users.name, users.picture_url, tweets.content FROM tweets JOIN users ON tweets.user_id = users.id', 
      function (err, result) {
        if (err) return next(err);
        var tweets = result.rows;
        res.render('index', {title: 'Twitter.js', tweets: tweets, showForm: true});
    });
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
    //let list = tweetBank.find({name: name});
    client.query('SELECT tweets.id AS id, users.name, users.picture_url, tweets.content FROM tweets JOIN users ON tweets.user_id = users.id WHERE users.name=$1', [name], function (err, result) {
      let tweets = result.rows;
      res.render('index', {tweets: tweets, showForm: true});
    });
  });

  router.get('/tweets/:id', function (req, res) {
    // let tweets = tweetBank.find({id: parseInt(req.params.id)});
    let tweetId = Number(req.params.id);
    client.query('SELECT tweets.id AS id, users.name, users.picture_url, tweets.content FROM tweets JOIN users ON tweets.user_id = users.id WHERE tweets.id=$1', [tweetId], function (err, results) {
      let tweets = results.rows;
      res.render('index', {tweets: tweets, showForm: false});
    });
  });

  /* The <form> tag in views/index.html has the attributes 'action' and 
   * 'method'; the former is the HTTP request, the latter is the method 
   * designated to handle the request.
   */
  router.post('/tweets', function (req, res) {
    //let newTweet = tweetBank.add(req.body.name, req.body.text);
    let username = req.body.name;
    let tweetContent = req.body.text;
    let userId;

    client.query('SELECT id FROM users WHERE name=$1', [username],
      function (err, results) {
        userId = Number(results.rows[0].id);

        client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2)', [userId, tweetContent], function (err, results) {
          console.log('New tweet added for ' + username);
        });
    });

    //io.sockets.emit('newTweet', newTweet);
    res.redirect('/');
    // This last line makes a new GET request towards the main page
  });

  return router;
};
