// ==UserScript==
// @name                Blogalia
// @namespace           http://geneura.org/projects/greasemonkey
// @description         Cambia  cosas en la portada de blogalia
// @include             http://www.blogalia.com/
// @include             http://blogalia.com/
// ==/UserScript==

function putComentarios( results ){
  GM_log(results.responseText);
  var comentarios; 
  eval( "comentarios = " + results.responseText );
  var table = document.getElementById('historias');
  var blogs = table.getElementsByTagName('tr');
  for ( var row = 0; row < blogs.length; row ++ ) {
    var columns = blogs[row].getElementsByTagName('td');
    var thisA = columns[0].getElementsByTagName('a');
    var span = document.createElement('span');
    span.setAttribute('style','background:blue');
    var comstar='';
    for ( var i=0; i < comentarios[thisA[0].href]/5; i++ ) {
      comstar +='*';
    }
    GM_log(comstar);
    var txt = document.createTextNode(comstar);
    span.appendChild(txt);
    thisA[0].parentNode.insertBefore(span, thisA[0]);
  }
  
}

GM_log('Haciendo petición');
GM_xmlhttpRequest({method:'GET', 
		      url:'http://geneura.ugr.es/~jmerelo/atalaya/chismes/comentarios_js.cgi',
		      onload:putComentarios});
GM_log('Petición hecha');


