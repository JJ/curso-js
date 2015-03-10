// Lee los resultados de un fichero y los devuelve como array.
function lee_resultados( file_name ) {
    var FileReader = java.io.FileReader;
    var BufferedReader =java.io.BufferedReader;
    var f = new FileReader(file_name);
    var br = new BufferedReader( f );
    var resultados= new Array;
    var line = new String;
    if ( !resultados[resultado[0]] ) {
    	resultados[resultado[0]]=0;
    }
    if ( !resultados[resultado[1]] ) {
	resultados[resultado[1]]=0;
    }
    while ((line = br.readLine()) != null) {
	var estaLinea = new String( line );
	var resultado  = estaLinea.split(" ");
	switch (resultado[2]) {
	case '1':
	    resultados[resultado[0]]+=3;
	    break;
	case 'x':
	    resultados[resultado[0]]+=1;
	    resultados[resultado[1]]+=1;
	    break;
	default:
	    resultados[resultado[1]]+=3;
	    break
	}
    }
  
    return resultados;
}

