// ==UserScript==
// @name                Blogalia
// @namespace           http://geneura.org/projects/greasemonkey
// @description         Cambia  cosas en la portada de blogalia
// @include             http://www.blogalia.com/
// @include             http://blogalia.com/
// ==/UserScript==


var table = document.getElementById('historias');
var blogs = table.getElementsByTagName('tr');
var request;

request = new XMLHttpRequest();

request.open('GET', 'http://geneura.ugr.es/~jmerelo/atalaya/chismes/comentarios_xml.cgi', true);
request.onreadystatechange= putComentarios ;
request.send(null);
var comentarios;

function putComentarios(){
  if ( request.readyState == 4 ) {
    if ( request.status == 200 ) {
      var doc = request.responseXML;
      var root=doc.documentElement;
      var html="<ul>";
      var nds = root.childNodes;
      for ( var i = 0; i < nds.length; i ++ ) {
	//          alert(nds[i].toString());
	//          html += "<li>"+ nds[i].firstChild.attributes[0].value + " - " + nds[i].firstChild.value + "</li>\n";
	if ( nds[i].nodeName == 'blog' ) {
	  comentarios[nds[i].attributes[0].value] = nds[i].firstChild.nodeValue;
	} 
      }
    }
  }
}
for ( var row = 0; row < blogs.length; row ++ ) {
  var columns = blogs[row].getElementsByTagName('td');
  var thisA = columns[0].getElementsByTagName('a');
  var span = document.createElement('span');
  span.setAttribute('style','background:blue');
  var txt = document.createTextNode('*');
  span.appendChild(txt);
  GM_log(thisA[0].href);
  thisA[0].parentNode.insertBefore(span, thisA[0]);
 }
