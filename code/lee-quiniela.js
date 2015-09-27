#!/usr/bin/env node

var fs = require('fs');
fs.readFile('quiniela.datos', 'utf8', 
	    function(err,datos) {
		if (err) {
		    return console.log(err);
		};
		var filas = datos.split("\n");
		for ( var f in filas ) {
		    var cachos = filas[f].split(" ");
		    var partido = { 'local': cachos[0],
				    'visitante': cachos[1],
				    'resultado': cachos[2] };
		    console.log( partido );
		}
	    });
