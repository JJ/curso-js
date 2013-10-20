#!/usr/bin/smjs


   // Definición de la clase Partido
function Partido(local,visitante) {
  this.local = local;
  this.visitante=visitante;
  this.resultado=null;
  this.setResultado = setResultado;
  this.toString = toString;
}

function setResultado( esteResultado ) {
  if ( esteResultado == '1' || esteResultado=='x' || esteResultado=='2' ) 
    this.resultado = esteResultado;
}

function toString() {
    return "Partido " + i + ": " + quiniela[i].local + " - " + quiniela[i].visitante + " = "+ this.resultado;
}

var equipos= new Array('Madrid', 'Barça', 'Atleti', 'Geta', 'Betis', 'Depor', 'Sevilla', 'Graná');

var midsize = equipos.length/2;
var quiniela = new Array( midsize );
var unox2 = new Array( '1','x','2');
for ( i=0; i < midsize ; i++ ) {
  var equipo1 = equipos.splice(Math.floor( equipos.length*Math.random()) , 1);
  var equipo2 = equipos.splice(Math.floor( equipos.length*Math.random()), 1);
  quiniela[i] = new Partido( equipo1, equipo2 );
  quiniela[i].setResultado( unox2[Math.floor( 3*Math.random()) ]);
  print( quiniela[i].toString());
 }


