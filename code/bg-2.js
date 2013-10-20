// ==UserScript==
// @name                Blogalia
// @namespace           http://geneura.org/projects/greasemonkey
// @description         Cambia  cosas en la portada de blogalia
// @include             http://www.blogalia.com/
// @include             http://blogalia.com/
// ==/UserScript==

GM_log('Aquí estoy');
var table = document.getElementById('historias');
GM_log('table ' + table );
//var blogs = document.evaluate("tr",
//			      document.getElementById('historias'), 
//			      null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var blogs = table.getElementsByTagName('tr');
GM_log('blogs.length ' + blogs.length );
//var info;
//for ( var i = 0; i < blogs.snapshotLength; i ++ ) {
//  GM_log(blogs.snapshotItem(i).textContent);
//}

for ( var row = 0; row < blogs.length; row ++ ) {
  var columns = blogs[row].getElementsByTagName('td');
  //  for ( var column = 0; column < columns.length; column++ ) {
  //    GM_log(row + " - " + column + " - " + columns[column].textContent);
  // }
  var thisA = columns[0].getElementsByTagName('a');
  var span = document.createElement('span');
  span.style='background:blue';
  var txt = document.createTextNode('&nbsp;');
  span.appendChild(txt);
  thisA.parentNode.insertBefore(span, thisA);
 }
