#!/usr/bin/smjs

load('Nuevo_partido.js');

var equipos= new Array('Madrid', 'Barça', 'Atleti', 'Geta', 'Betis', 'Depor', 'Sevilla', 'Graná');

function jornada( estosEquipos ) {
    var equiposAqui = new Array;
    var imprime = function( local, visitante, resultado ) { 
	print("Imprimiendo \n");
	return  "- " + local + " vs. " + visitante + " resultado  "+ resultado;
    };
    equiposAqui = equiposAqui.concat(estosEquipos);
    var midsize = equiposAqui.length/2;
    var quiniela = new Array( midsize );
    var unox2 = new Array( '1','x','2');
    for ( var i=0; i < midsize ; i++ ) {
	var equipo1 = equiposAqui.splice(Math.floor( equiposAqui.length*Math.random()) , 1);
	var equipo2 = equiposAqui.splice(Math.floor( equiposAqui.length*Math.random()), 1);
	quiniela[i] = new Nuevo_partido( equipo1, equipo2 );
	quiniela[i].setResultado( unox2[Math.floor( 3*Math.random()) ]);
	quiniela[i].set_to_string( imprime );
    }
    return quiniela;
}

var quinielas = new Array;
for ( var i = 0; i < 10; i ++ ) {
  quinielas[i] = jornada( equipos ); 
}

var resultados= new Array;
for ( var i in equipos ) {
  resultados[equipos[i]]=0;
}

for ( var i = 0; i < quinielas.length; i ++ ) {
    for ( var j = 0;j < quinielas[i].length; j ++ ) {
      var local = quinielas[i][j].local;
      var visitante = quinielas[i][j].visitante;
      var resultado = quinielas[i][j].resultado;
      switch (resultado) {
    case '1':
	resultados[local]+=3;
	break;
    case 'x':
	resultados[local]+=1;
	resultados[visitante]+=1;
	break;
    default:
	resultados[visitante]+=3;
    }
  }
}

for ( var i in resultados ) {
  print( i + ": " + resultados[i])
}
