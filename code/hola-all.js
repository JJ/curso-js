var write;

if ( typeof console != "undefined" ) {
    write = console.log;
} else {
    write = print;
}

write( 'Hola, Mundo' );
