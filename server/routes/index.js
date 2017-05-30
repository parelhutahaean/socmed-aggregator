const express = require('express');
const router = express.Router();
require('dotenv').config();
var utils = require('../helpers/utils');

var OAuth = require('oauth');
var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.CONSUMER_KEY,
  process.env.CONSUMER_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);

router.get('/', (req, res) => {
  res.send('Alive from router');
})

router.post('/search', (req, res) => {
  var encoded = utils.fixedEncodeURIComponent(req.body.keyword);
  oauth.get(
  `https://api.twitter.com/1.1/search/tweets.json?q=${encoded}`,
  process.env.ACCESS_TOKEN,
  process.env.ACCESS_SECRET,
  function (e, data){
    if (e) res.send(e);
    var statuses = JSON.parse(data).statuses;
    res.send(statuses);
  });
})

router.get('/timeline', (req, res) => {
  oauth.get(
  `https://api.twitter.com/1.1/statuses/user_timeline.json`,
  process.env.ACCESS_TOKEN,
  process.env.ACCESS_SECRET,
  function (e, data){
    if (e) res.send(e);
    var statuses = JSON.parse(data);
    res.send(statuses);
  });
})

router.post('/updatestatus', (req, res) => {
  oauth.post(
    `https://api.twitter.com/1.1/statuses/update.json?status=${req.body.status}`,
    process.env.ACCESS_TOKEN,
    process.env.ACCESS_SECRET,
    req.body.status,
    'text',
    (err, data) => {
      if (err) res.send(err);
      res.send(JSON.parse(data));
    }
  )
})

module.exports = router;
