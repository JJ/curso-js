$(document).ready(function() {
	$("#formulario").change(function(){
		$.get('/contador/'+$('#contador').val(), function( data) {
			  $('#Resultado').html('Resultado '+ data.resultado);
		      });
	});
} );  	      

