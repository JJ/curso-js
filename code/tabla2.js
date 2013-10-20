#!/usr/bin/smjs

var matriz = [1,2,3];
print( marca('table'));
for (i in matriz ) {
  print( marca( 'tr' ));
  for ( j in matriz ) {
    print ( celda(matriz[i]*matriz[j]));
  }
  print ( finmarca('tr'));
}
print (finmarca('table'));

function marca( m ) {
  return "<"+m+">";
}

function finmarca( m ) {
  return "</"+m+">";
}

function celda( contenido ) {
  return marca("td")+contenido+finmarca("td");
}
