#!/usr/bin/node

var request = require('request');
var url ='http://api.twitter.com/1/statuses/public_timeline.json';
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body));
  } else {
      console.log(error);
  }
})