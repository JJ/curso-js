// ==UserScript==
// @name                AAP-Nav
// @namespace           http://geneura.org/projects/greasemonkey
// @description         Navegación por las secciones de AAP
// @include             http://geneura.ugr.es/~jmerelo/asignaturas/*
// ==/UserScript==

GM_log('Entrando en AAP-Nav');
var h2 = document.getElementsByTagName('h2');
var a_nodes = new Array;
var anchors = new Array;
for ( var secs = 0; secs < h2.length; secs ++ ) {
  var thisA = h2[secs].getElementsByTagName('a');
  a_nodes[secs] = thisA[0];
  anchors[secs] = thisA[0].getAttribute('name');
  GM_log('Anchor ' + secs + " " + anchors[secs]);
}

for ( var secs = 0; secs < h2.length; secs ++ ) {
  var span = document.createElement('span');
  span.setAttribute('style','background:lightblue');
  if ( secs > 0 ) {
    var ahref = document.createElement('a');
    ahref.setAttribute('href','#'+anchors[secs-1]);
    var txt=document.createTextNode('^');
    ahref.appendChild(txt);
    span.appendChild(ahref);
  }
  if ( secs < h2.length -1  ) {
    span.appendChild(document.createTextNode(' | '));
    var ahref = document.createElement('a');
    ahref.setAttribute('href','#'+anchors[secs+1]);
    var txt=document.createTextNode('v');
    ahref.appendChild(txt);
    span.appendChild(ahref);
  }
  a_nodes[secs].parentNode.insertBefore(span,a_nodes[secs]);
}




