var express=require('express');
var app = express.createServer();
var contadores = new Array;
var puerto=process.argv[2]?process.argv[2]:8080;

app.get('/', function (req, res) {   
	res.send('Portada');
});

app.put('/contador/:id', function( req,res ) {
    contadores[req.params.id] = 0;
    res.send( { creado: req.params.id } );
});

app.get('/contador/:id', function (req, res) {   
    res.send( "{ "+req.params.id+": "+ contadores[req.params.id] + "}"  );
});

app.post('/contador/:id', function (req, res) {   
    contadores[req.params.id]++;
    res.send( "{ "+req.params.id+": "+ contadores[req.params.id] + "}"  );
});

app.listen(puerto);
console.log('Server running at http://127.0.0.1:'+puerto+'/');