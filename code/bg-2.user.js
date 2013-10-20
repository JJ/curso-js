// ==UserScript==
// @name                Blogalia
// @namespace           http://geneura.org/projects/greasemonkey
// @description         Cambia  cosas en la portada de blogalia
// @include             http://www.blogalia.com/
// @include             http://blogalia.com/
// ==/UserScript==


var table = document.getElementById('historias');
var blogs = table.getElementsByTagName('tr');

for ( var row = 0; row < blogs.length; row ++ ) {
  var columns = blogs[row].getElementsByTagName('td');
  var thisA = columns[0].getElementsByTagName('a');
  var span = document.createElement('span');
  span.setAttribute('style','background:blue');
  var txt = document.createTextNode('*');
  span.appendChild(txt);
  thisA[0].parentNode.insertBefore(span, thisA[0]);
 }
