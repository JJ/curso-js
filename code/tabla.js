#!/usr/bin/smjs

var tabla="table";
var celda="td";
var fila="tr";
var matriz = [1,2,3];
print( "<"+tabla+">");
for (i in matriz ) {
  print( "<"+fila+">");
  for ( j in matriz ) {
    print ("<"+celda+">"+matriz[i]*matriz[j]+"</"+celda+">");
  }
  print ("</"+fila+">\n");
 }
print ("</"+tabla+">");
