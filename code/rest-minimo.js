#!/usr/bin/env node

var http=require('http'); 
var puerto=process.argv[2]?process.argv[2]:8080;
http.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    var split_url=req.url.split("/"); 
    if ( split_url[1] == '' ) { 
	res.end('Portada'); 
    } else if ( split_url[1] == 'proc' ) { 
	res.end('No es la portada'); 
    } else { 
	res.end('No entiendo la petición'); 
    } 
}).listen(puerto, '127.0.0.1'); 
console.log('Server running at http://127.0.0.1:'+puerto+'/');