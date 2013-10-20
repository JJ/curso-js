var contadores= new Array;
function multicontador(  numero ) {
      if ( ! contadores[ numero ]  )
          contadores[ numero ] = 1;
      else
          contadores[numero ]++;
      document.write( ' ' + contadores[numero]+' ' );
};

// Objeto contador que sirve para poner números a los títulos de los tutoriales
function contador( key, prefijo, tag ) {
    this.key = key;
    this.prefijo = prefijo;
    this.tag = tag;
    this.contador = 0;
    this.incWrite = incWrite;
    this.getValue = getValue;
}

//Incrementa y escribe
function incWrite( content, ref ) {
    this.contador++;
    var str;
    if ( this.tag != '' ) 
       str = "<"+this.tag+">";
    if ( ref != '') 
       str += "<a name='"+ref+"'>";
    str += this.prefijo + this.contador + " " + content;
    if ( ref != '') 
       str += "</a>";
    if ( this.tag != '' ) 
       str += "</"+this.tag+">"; 
//    alert( str );
    document.write( str );
}

//recupera el valor 
function getValue() {
  return this.prefijo+this.contador;
}
