function(doc) {
  if (doc.res_local) {
     var quiniela;
     if ( doc.res_local > doc.res_visitante ) {
	quiniela='1';
     } else if ( 	doc.res_local < doc.res_visitante ) {
	quiniela='2';
     } else {
        quiniela='X';
     }
     emit(quiniela);
  }
}