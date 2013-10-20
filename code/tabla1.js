#!/usr/bin/smjs

var tabla="table";
var celda="td";
var fila="tr";
print( "<"+tabla+">");
for (i=1; i<=3; i++ ) {
  print( "<"+fila+">");
  for ( j=1; j<=3; j++  ) {
    print ("<"+celda+">"+i*j+"</"+celda+">");
  }
  print ("</"+fila+">\n");
 }
print ("</"+tabla+">");
