#!/usr/local/bin/node

var cradle = require('cradle');
var db = new(cradle.Connection)().database('ahora_no');

db.save('_design/equipos', {
    views: {
      quiniela : {
        map: function(doc) {
	    var x12;
	    if (doc.res_local > doc.res_visitante) { 
		x12 = '1';
	    } else if (doc.res_local < doc.res_visitante ) { 
		x12 = '2';
	    } else { 
		x12 = 'X'; 
	    }
	    emit( x12, { local: doc.local, visitante: doc.visitante} );
	}
      }
    },
	    lists: { 
		lista: function(head, req) { 
		    var row; 
		    start({ "headers": { "Content-Type": "text/html" } }); 
		    while(row = getRow()) { 
			send( "<li>" + row.value.local + " - " + row.value.visitante + " : " + row.key + "</li>\n" ); 
		    }
		}
	    }
  });