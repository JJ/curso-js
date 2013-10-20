// ejecutar con rhino lee_quiniela.js <argumento>
load('Partido.js');
var FileReader = java.io.FileReader;
var BufferedReader =java.io.BufferedReader;

var file_name = arguments[0];

var f = new FileReader(file_name);
var br = new BufferedReader( f );
var resultados= new Array;
var line = new String;
while ((line = br.readLine()) != null) {
  var estaLinea = new String( line );
  var resultado  = estaLinea.split(" ");
  switch (resultado[2]) {
    case '1':
      if ( resultados[resultado[0]] ) {
	resultados[resultado[0]]+=3;
      } else {
	resultados[resultado[0]]=3;
      }
      break;
    case 'x':
      if ( resultados[resultado[0]] ) {
	resultados[resultado[0]]+=1;
      } else {
	resultados[resultado[0]]=1;
      }
      if ( resultados[resultado[1]] ) {
	resultados[resultado[1]]+=1;
      } else {
	resultados[resultado[1]]=1;
      }
      break;
    default:
       if ( resultados[resultado[1]] ) {
	resultados[resultado[1]]+=3;
      } else {
	resultados[resultado[1]]=3;
      }
      break
  }
 }

for ( var i in resultados ) {
  print( i + ": " + resultados[i])
    }


