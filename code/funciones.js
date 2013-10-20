// Definición de la clase Partido
function Nuevo_partido(local,visitante) {
    this.local = local;
    this.visitante=visitante;
    this.resultado=null;
    this.setResultado = setResultado;
    this.toString = toString;
    this.set_to_string = set_to_string;
    this.impresor = _toString;
}

function setResultado( esteResultado ) {
    if ( esteResultado == '1' || esteResultado=='x' || esteResultado=='2' ) 
	this.resultado = esteResultado;
}

function toString() {
    return this.impresor(this.local, this.visitante, this.resultado);
}

function _toString( local, visitante, resultado ) {
    return ": " + local + " - " + visitante + " = "+ resultado;
}

function set_to_string ( impresor ) {
    this.impresor = impresor;
}

/// El programa empieza aquí
var equipos= new Array('Madrid', 'Barça', 'Atleti', 'Geta', 'Betis', 'Depor', 'Sevilla', 'Graná');

function jornada( estosEquipos ) {
    var equiposAqui = new Array;
    var imprime = function( local, visitante, resultado ) { 
	console.log("Imprimiendo \n");
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
  console.log( i + ": " + resultados[i])
}