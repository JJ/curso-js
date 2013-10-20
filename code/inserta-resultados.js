
fs = require('fs');
var resultados_file = process.argv[2];
var db = require('nano')('http://localhost:5984/')
    .use("una_mas");
fs.readFile(resultados_file, 'utf8', 
	    function(err,datos) {
		if (err) {
		    return console.log(err);
		};
		var filas = datos.split("\n");
		var resultados = new Array;
		for ( var f in filas ) {
		    var cachos = filas[f].split(" ");
		    var resultado = cachos[2].split("-");
		    console.log({ 'local': cachos[0],
				       'visitante': cachos[1],
				       'res_local': resultado[0],
				  'res_visitante': resultado[1] } );

		    resultados.push( { 'local': cachos[0],
				       'visitante': cachos[1],
				       'res_local': resultado[0],
				       'res_visitante': resultado[1] } );
		}

		db.bulk( { 'docs' : resultados},
			 function (error,http_body,http_headers) {
			     console.log(http_body);
			 }
		       );
		
	    });