// Definición de la clase Partido
function Partido(local,visitante) {
  this.local = local;
  this.visitante=visitante;
  this.resultado=null;
  this.setResultado = setResultado;
  this.toString = toString;
}

function setResultado( esteResultado ) {
  if ( esteResultado == '1' || esteResultado=='x' || esteResultado=='2' ) 
    this.resultado = esteResultado;
}

function toString() {
    return "Partido " + i + ": " + this.local + " - " + this.visitante + " = "+ this.resultado;
}
