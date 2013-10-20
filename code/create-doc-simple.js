#!/usr/local/bin/node
 
var nano = require('nano')('http://localhost:5984/');
var db_name = "ahora_no";
var db = nano.use(db_name);
db.insert( { _id : 'expid_instanceid',
	     vector: [ 11,22,33],
	     type: 'mine' },
	   function (error,http_body,http_headers) {
	       console.log(http_body);
	   }
	 );
