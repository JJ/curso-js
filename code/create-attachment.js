#!/usr/local/bin/node
 
var fs=require('fs');
var file = fs.readFileSync('index.html');
var id =process.argv[2]; // undef if not present
var nano = require('nano')('http://localhost:5984/');
var db_name = "ahora_no";
var db = nano.use(db_name);
var document = { name: 'Documento',
		 breadcrumb: 'index',
		 type: 'html' };
if (id ) {
  document.id = id;  
}
console.log(document);

db.insert( document,
	   function (error,http_body,http_headers) {
	       if ( !id ) {
		   document.id = http_body.id;
	       }
	       db.get(document.id, function(error,body) {
			  db.attachment.insert( document.id, 'index.html', file, 'text/html', 
					      {rev: body._rev},
						function(err,body ) {
						    console.log(body);
						} ) ;
		      } );
	   } );
