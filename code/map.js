#!/usr/bin/node

var db = require('nano')('http://localhost:5984/')
    .use("ahora_no");

db.view('prueba','diferencia',{ group: true }, function( error, http_body ) {
    console.log(http_body);
} );