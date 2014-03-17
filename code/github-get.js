#!/usr/bin/env node

var https = require('https');

var user =process.argv[2]?process.argv[2]:'JJ';

var options = {
    host: 'api.github.com',
    path: '/users/'+user,
    method: 'GET',
    headers: {'User-Agent': 'Prueba-Node-App'}
};


var req = https.get(options, function(res) {
			   res.setEncoding('utf8');
			   res.on('data', function (datos_JSON) {
			       console.log(datos_JSON);
			       var datos=JSON.parse(datos_JSON);
			       console.log('Login: ' + datos.login+ "\nNombre: " + datos.name + "\n");
			   });
});
req.end();
