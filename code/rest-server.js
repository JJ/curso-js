var puerto=process.argv[2]?process.argv[2]:8080;
var express=require('express'); 
var app = express.createServer(); 
app.get('/', function (req, res) { 
    res.send('Portada'); 
}); 
app.get('/proc', function (req, res) { 
    res.send('No es la portada'); 
}); 

app.listen(puerto); 
console.log('Servidor en http://127.0.0.1:'+puerto+'/');