#!/usr/bin/node

var https = require('https');
var state =process.argv[2]?process.argv[2]:'open';
var options = {
host: 'api.github.com',
path: 'https://api.github.com/repos/jj/curso-js/issues?state='+state,
method: 'GET',
headers: {'user-agent': 'PruebaNode'}
};


var req = https.get(options, function(res) {
res.setEncoding('utf8');
var datos_JSON_acc='';
res.on('data', function (datos_JSON) {
datos_JSON_acc += datos_JSON;
});
res.on('end', function () {
// console.log(datos_JSON_acc);  // descomentar para ver todo el resultado
var datos=JSON.parse(datos_JSON_acc);
if (Array.isArray(datos))  // Comprobamos si tenemos un array de resultado o solo 1
{
  for(var i=0;i<datos.length;i++)  // Iteramos por todos los valores recuperados
  {  console.log('Issue: ' + datos[i].title+ "\nUser: " + datos[i].user.login + "\n"); }
}
else
        console.log('Issue: ' + datos.title+ "\nUser: " + datos.user.login + "\n");
});
});
req.end();
