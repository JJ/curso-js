// ejecutar con rhino lee_quiniela.js <argumento>

function lee_resultados( file_name ) {
  var FileReader = java.io.FileReader;
  var BufferedReader =java.io.BufferedReader;
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
  
  return resultados;
}

