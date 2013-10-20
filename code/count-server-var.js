
// variable front page
var fs = require('fs');
var express=require('express');
var app = express.createServer();
var contadores = new Array;
var portada = fs.readFileSync(process.argv[2]+'.html','utf8');

app.get('/', function (req, res) { 
    res.send(portada);
});

app.get('/js/:page', function (req, res) { 
    var js = fs.readFileSync(req.params.page);
    res.contentType('text/javascript');
    res.send(js);
});

app.put('/contador/:id', function( req,res ) {
    contadores[req.params.id] = 0;
    res.send('Creado contador '+ req.params.id );
});

app.post('/contador/:id', function (req, res) {   
    contadores[req.params.id]++;
    res.contentType('application/json');
    res.send( { resultado:  contadores[req.params.id] } );
    console.log( { 'Post':  contadores} );
});

app.get('/contador/:id', function (req, res) {   
    res.contentType('application/json');
    res.send( { resultado:  contadores[req.params.id] } );
});

app.get('/suma/:id1/:id2', function (req, res) {   
    res.send( { resultado: contadores[req.params.id1] +  contadores[req.params.id2]} );
});

app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');