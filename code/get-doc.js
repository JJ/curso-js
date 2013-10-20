
var id = process.argv[2];

var db = require('nano')('http://localhost:5984/')
    .use("ahora_no");
db.get( id, null, do_stuff );

// -------------------------------------------------------------------------------
function do_stuff( error,data) {
    console.log(data);
    var result = 0;
    for (var i in data.vector) {
	result += data.vector[i];
    }
    data.result = result;
    console.log( 'Resultado ' + result );
    db.insert( data, { rev: data._rev }, 
	       function(error,resp) {
		   console.log( resp );
	       } );
}
 