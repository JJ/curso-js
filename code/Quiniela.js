// Definición de la clase Partido
function Partido(local,visitante) {
  this.local = local;
  this.visitante=visitante;
  this.resultado=null;
}

var equipos= new Array('Madrid', 'Barça', 'Atleti', 'Geta', 'Betis', 'Depor', 'Sevilla', 'Graná');

var midsize = equipos.length/2;
var quiniela = new Array( midsize );
for ( i=0; i < midsize ; i++ ) {
  var equipo1 = equipos.splice(Math.floor( equipos.length*Math.random()) , 1);
  var equipo2 = equipos.splice(Math.floor( equipos.length*Math.random()), 1);
  quiniela[i] = new Partido( equipo1, equipo2 );
 }

for ( i in quiniela ) {
  print( "Partido " + (parseInt(i)+1)+": " + quiniela[i].local + " - " + quiniela[i].visitante);
 }
