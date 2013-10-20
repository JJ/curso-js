var request;
function cuenta() {
  request = new XMLHttpRequest();
  var contador=document.getElementById('contador').value;
  var peticion_str = '/contador/'+contador;
  request.open('POST', peticion_str , true);
  request.onreadystatechange= escribe_resultado ;
  request.send(null);
}

function escribe_resultado(){
  if ( request.readyState == 4 ) {
    if ( request.status == 200 ) {
	var json;
	eval ( 'json = '+ request.responseText );
	console.log(json);
	document.getElementById('Resultado').innerHTML= 'Resultado = '+ 
	    json.resultado
    }
  }
}
