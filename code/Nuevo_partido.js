// Definición de la clase Partido
function Nuevo_partido(local,visitante, resultado) {
    this.local = local;
    this.visitante=visitante;
    this.resultado=resultado;
    this.setResultado = setResultado;
    this.toString = toString;
    this.set_to_string = set_to_string;
    this.impresor = _toString;
}

function setResultado( esteResultado ) {
    if ( esteResultado == '1' || esteResultado=='x' || esteResultado=='2' ) 
	this.resultado = esteResultado;
}

function toString() {
    return this.impresor(this.local, this.visitante, this.resultado);
}

function _toString( local, visitante ) {
    return ": " + this.local + " - " + this.visitante + " = "+ this.resultado;
}

function set_to_string ( impresor ) {
    this.impresor = impresor;
}