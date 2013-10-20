// this function will be called by our JSON callback
// the parameter jData will contain an array with geonames objects
function getLocation(jData) {
  if (jData == null) {
    // There was a problem parsing search results
    return;
  }

  var html = '<ul>';
  var geonames = jData.geonames;
  for (i=0;i< geonames.length;i++) {
     var name = geonames[i];
     // we create a simple html list with the geonames objects
     // the link will call the center() javascript method with lat/lng as parameter
     html = html+"<li><em>"+name.name+ "</em> - Latitud: " + name.lat +', longitud: ' + name.lng+ "</li>";
  }
  html+="</ul>";
  document.getElementById('resultDiv').innerHTML = html;
}

// calls the geonames JSON webservice with the search term
function search() {
  request = 'http://ws.geonames.org/searchJSON?country=ES&q=' +  encodeURIComponent(document.getElementById('q').value)  + '&maxRows=10&callback=getLocation';

  // Create a new script object
  // Implementación en jsr_class.js
  aObj = new JSONscriptRequest(request);
  // Build the script tag
  aObj.buildScriptTag();
  // Execute (add) the script tag
  aObj.addScriptTag();
}
