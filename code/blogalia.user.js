// ==UserScript==
// @name                Blogalia
// @namespace           http://geneura.org/projects/greasemonkey
// @description         Añade cosas a la portada de blogalia
// @include                     http://*.blogalia.com
// ==/UserScript==

        

var elmSearchDiv = document.createElement('div');

elmSearchDiv.innerHTML =
  
  '<form method="GET" action="http://www.google.com/search">' +
  '<label for="as_q">Calcula:</label> ' + 
  '<input type="text"  name="q" accesskey="S"> ' +   
  '<input type="submit" value="Search">' +
  '</form>';

document.body.insertBefore(elmSearchDiv, document.body.firstChild);

elmSearchDiv.style.fontSize = 'small';

elmSearchDiv.style.textAlign = 'right';

elmSearchDiv.style.borderBottom = '1px solid silver';
