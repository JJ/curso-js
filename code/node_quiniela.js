#!/usr/bin/node

fs = require('fs');
eval(fs.readFileSync('./Nuevo_partido.js', 'utf8')); 
fs.readFile('quiniela.datos', 'utf8', 
	    function(err,datos) {
		if (err) {
		    return console.log(err);
		};
		var filas = datos.split("\n");
		for ( var f in filas ) {
		    var cachos = filas[f].split(" ");
		    var este_partido = new Nuevo_partido( cachos[0], cachos[1], cachos[2] );
		    console.log(f + " " + este_partido.toString() );
		}
	    });
console.log('Ya lo hemos ejecutado');