#!/usr/bin/node

var https = require('https');

var user =process.argv[2]?process.argv[2]:'JJ';

var options = {
    host: 'api.github.com',
    path: '/users/'+user,
    method: 'GET',
    headers: {'user-agent': 'PruebaNode'}
};


var req = https.get('https://api.github.com/users/'+user, function(res) {
			   res.setEncoding('utf8');
			   res.on('data', function (datos_JSON) {
				      var datos=JSON.parse(datos_JSON);
				      console.log('Login: ' + datos.login+ "\nNombre: " + datos.name + "\n");
				  });
		       });
req.end();
