#!/usr/bin/env js

var matriz = [1,2,3];
var wrap = function(m, start, end ) { return start+m+end; }
var marca = function( m ) { return wrap(m, "<",">"); }
var finmarca = function( m ) { return wrap(m,"</",">"); }
var celda = function( contenido ) { 
    return wrap( contenido, marca("td"), finmarca("td"));
}
var do_print=(typeof console != "undefined")
    ?function(msg){console.log(msg)}
    :print;

do_print( marca('table'));
matriz.forEach( function(elemento_i) {
    do_print( marca( 'tr' ) );
    matriz.forEach( function(elemento_j ) {
	do_print ( celda(elemento_i*elemento_j));
    });
    do_print( finmarca( 'tr' ));
})
do_print (finmarca('table'));


