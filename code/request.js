var request = require('request');
var url ='https://stream.twitter.com/1.1/statuses/sample.json ';
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body));
  } else {
      console.log(error);
  }
})