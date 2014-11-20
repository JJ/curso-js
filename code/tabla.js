#!/usr/bin/js24

var tabla="table";
var celda="td";
var fila="tr";
var matriz = [1,2,3];
print( "<"+tabla+">");
for (i in matriz ) {
  print( "\t<"+fila+">");
  for ( j in matriz ) {
    print ("\t\t<"+celda+">"+matriz[i]*matriz[j]+"</"+celda+">");
  }
  print ("\t</"+fila+">\n");
 }
print ("</"+tabla+">");
