var request;

function pide_RSS() {
  request = new XMLHttpRequest();
  var url=document.getElementById('url').value;
  var cuantos=document.getElementById('cuantos').value;
  var peticion_str = 'http://geneura.ugr.es/~jmerelo/asignaturas/AAP/cgi/XMLvar_2.cgi?url='+encodeURIComponent(url)+'&num_elementos='+cuantos;
  request.open('GET', peticion_str , true);
  request.onreadystatechange= escribe_RSS ;
  request.send(null);
}

function escribe_RSS(){
  if ( request.readyState == 4 ) {
    if ( request.status == 200 ) {
      //      alert(request.responseText);
      var doc = request.responseXML;
      var root=doc.documentElement;
      var html="<ul>";
      var items=root.getElementsByTagName('item');
      for ( var i = 0; i < items.length; i ++ ){
	var title = items[i].getElementsByTagName('title')[0];
	var url = items[i].getElementsByTagName('link')[0];
	  html += "<li><a href='"+url.firstChild.data 
	    + "'>"+title.firstChild.data+ "</li>";
      }
      html += "</ul>";
      document.getElementById('RSS').innerHTML=html;
    }
  }
}
