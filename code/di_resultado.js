load('/usr/lib/js/prototype.js'); // Funciona con rhino solo
load('Resultados.js');

if (arguments.lenght == 0 ) {
  print("Uso: di_resultado.js <fichero> <equipo>");
 }

var results_file=arguments[0];
var equipo = arguments[1];

var resultados = $H( lee_resultados( results_file ));
