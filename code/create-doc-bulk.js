#!/usr/local/bin/node

var url = process.argv[2],
db_name=process.argv[3],
id=process.argv[4],
how_many=process.argv[5];
var db = require('nano')(url).use(db_name);
var all_docs = new Array;
for ( var j = 0; j < how_many; j ++ ) {
    var doc = new Object;
    doc._id = id+"_"+j;
    doc.vector = new Array;
    for ( var i = 0; i < 5; i++ ) {
	doc.vector[i] = Math.random();
    }
    console.log( doc );
    all_docs.push( doc );
}

console.log(all_docs);
db.bulk( { 'docs' : all_docs},
	 function (error,http_body,http_headers) {
	     console.log(http_body);
	 }
       );
