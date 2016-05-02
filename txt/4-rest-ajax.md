#Trabajando con REST y Ajax

##Objetivos de este capítulo

-   Aprender los conceptos generales de los interfaces REST.
-   Programar clientes y servidores para REST usando diferentes
    lenguajes de programación
-   Introducción a Ajax y otras técnicas cliente-servidor.

## Introducción al interfaz REST

El *protocolo*
[REST, o Representational State Transfer](https://es.wikipedia.org/wiki/REST)
consiste en una serie de convenciones
en la interacción cliente-servidor basadas en el protocolo HTTP. En
la práctica, un API REST es un interfaz de programación de
aplicaciones que usa, para acceder al servidor, el conjunto completo de
órdenes del protocolo HTTP y confía en los mensajes
informativos y de error del mismo para interaccionar con él.

Aunque se trate de un *hermano menor* de otros tipos de servicios web
como SOAP, su popularidad se debe sobre
todo al poco *overhead* que añade a las peticiones, aunque esto
dependerá de la forma de codificación que se elija, y a la facilidad de su
uso, tanto en el cliente como el servidor. También se puede implementar
directamente sobre servidores web estándar como Apache o
[nginx](https://es.wikipedia.org/wiki/Nginx),

>En este caso no tan directamente, porque se trata de un servidor web
>estático. Hay que programar un puente a otro servicio que se encargue
>de generar contenido dinámicamente.

lo que facilita su
implantación y desarrollo.


Por otro lado, crear un cliente para un API REST es
tan fácil como crear una cadena y hacer una petición HTTP; de hecho, se pueden usar desde la línea
de órdenes o desde el navegador. Esa facilidad de uso explica su
popularidad en la creación de aplicaciones cliente-servidor hoy en
día.

Como REST se basa sobre HTTP, veremos a continuación cómo funciona
este protocolo y qué se puede usar de él para construir aplicaciones.

## El protocolo HTTP y sus múltiples posibilidades

El protocolo [HTTP](https://es.wikipedia.org/wiki/HTTP) es uno de los
protocolos más infrautilizados de la historia. A pesar de que ofrece
múltiples posibilidades y versiones, se usa simplemente para enviar y
recibir información de un servidor de la forma más simple.

En
realidad, HTTP premite transmitir información de muchas formas: Para recibir información se usa la
orden `GET`, y para enviar, la orden `POST`. Pero también hay otras
posibilidades, `PUT`, que envía un recurso determinado al servidor,
`DELETE`, que borra un recurso del servidor, e incluso `HEAD` igual que
`GET`, pero sin el cuerpo de la respuesta, sólo con la cabecera.

El protocolo HTTP gira alrededor del concepto de *recurso*: un
recurso en un servidor está identificado por un URI, *Universal
Resource Identifier*. Trabajar con un URI es la unidad de
acción que un servidor puede realizar; los recursos se agrupan en
colecciones, que son homogéneas y tienen un solo tipo de recurso. Como características adicionales,
la acción de algunas peticiones (`GET` y `HEAD`) debe ser *segura*, es
decir, dejar al servidor en el mismo estado que antes de la petición.
Otras acciones, como `PUT` y `DELETE`, se denominan *idempotentes*: el
hacer varias veces la misma petición tiene el mismo efecto que el
hacerla una sola vez.

HTTP funciona puramente como cliente-servidor: se hace una
petición, y se espera la respuesta. Lo que no quiere decir que no se
puedan hacer peticiones concurrentes y asíncronas; sin embargo, esas
peticiones tendrán que estar dentro del marco de una página web (o sea,
una aplicación).

A las peticiones el servidor responde con una serie de
[códigos estándar](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes),
que 
usan la misma presentación que la petición: texto puro y duro. Cuando
todo va bien, la respuesta es `200 OK`; los códigos `2xx` corresponden,
en general, a una petición hecha, y fuera de los 2xx existe el caos y el
descontrol. En especial, un código 500 implica error en el servidor.
Evidentemente, estos mensajes están pensados para que los lea un cliente
en el navegador; sin embargo, cuando trabajamos directamente sobre este
protocolo, nuestro programa deberá ser consciente de ellos y responder
de forma adecuada como si se tratara de una llamada a otro
procedimiento.

Las aplicaciones construidas alrededor del protocolo HTTP y sus
características se suelen llamar
[aplicaciones RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer). La
idea de REST es que se 
transfiere el estado del servidor al cliente. Un recurso tiene una
representación, que se transfiere al cliente por una petición; esa
representación se puede cambiar con diferentes operaciones. Sin embargo,
con esto sólo estamos especificando la capa más baja del servicio web;
hace falta una capa de mensajería. Y esta capa de mensajería se suele
denominar [POX](https://es.wikipedia.org/wiki/POX), o *Plain Old XML*
(XML *de toda la vida*), es decir XML bien formado con algunas
ampliaciones, pero sin ningún tipo de validación. En algunos casos se
usa texto directamente, aunque también se puede usar JSON o cualquier
otro tipo de capa.

De hecho, las aplicaciones
[REST suelen ser más populares](http://nordicapis.com/rest-better-than-soap-yes-use-cases/)
que otros servicios 
web, por el simple hecho de que es muy fácil construir el interfaz:
simplemente creando una cadena determinada. Eso los hace también más
rápidos, aunque sean menos flexibles.


## Creando clientes REST

Vamos a ver un ejemplo de uso de un interfaz de este tipo: el de
[Twitter](https://twitter.com/), cuyo [API](https://dev.twitter.com/overview/documentation) es
RESTful, y está bastante bien diseñada. Para usarla es
necesario darse de alta; desde la versión 1.1 del interfaz todas las
peticiones necesitan autenticación. Así que usaremos [otro interfaz, el de GitHub](http://developer.github.com/v3/), para hacer pruebas. Por
ejemplo, esta petición te dará todas las *organizaciones* a las que
pertenece el usuario [JJ](http://github.com/JJ):

~~~
bash$ curl -i https://api.github.com/users/JJ/orgs
~~~

Para llevar a cabo este ejemplo hay que instalar `curl`, un programa que
en una primera aproximación es simplemente un descargador de páginas web
pero que en segunda se puede usar como un completo cliente
REST; en este caso `-i` te incluye las cabeceras en la salida que se imprime,
con lo que producirá algo de este estilo

~~~
HTTP/1.1 200 OK
Server: GitHub.com
Date: Sun, 27 Sep 2015 10:37:52 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 1572
Status: 200 OK
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1443353872
Cache-Control: public, max-age=60, s-maxage=60
ETag: "5730bce87980897ab7fea5d3851e4fbb"
Vary: Accept
X-GitHub-Media-Type: github.v3
X-XSS-Protection: 1; mode=block
X-Frame-Options: deny
Content-Security-Policy: default-src 'none'
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval
Access-Control-Allow-Origin: *
X-GitHub-Request-Id: 5121A912:10752:2CFC37B:5607C700
Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
X-Content-Type-Options: nosniff
Vary: Accept-Encoding
X-Served-By: 065b43cd9674091fec48a221b420fbb3

[
  {
    "login": "openkratio",
    "id": 2310256,
    "url": "https://api.github.com/orgs/openkratio",
    "repos_url": "https://api.github.com/orgs/openkratio/repos",
    "events_url": "https://api.github.com/orgs/openkratio/events",
    "members_url": "https://api.github.com/orgs/openkratio/members{/member}",
    "public_members_url": "https://api.github.com/orgs/openkratio/public_members{/member}",
    "avatar_url": "https://avatars.githubusercontent.com/u/2310256?v=3",
    "description": "OpenGov & OpenData Organization"
  },
  {
    "login": "CANUBE",
    "id": 3839808,
    "url": "https://api.github.com/orgs/CANUBE",
    "repos_url": "https://api.github.com/orgs/CANUBE/repos",
    "events_url": "https://api.github.com/orgs/CANUBE/events",
    "members_url": "https://api.github.com/orgs/CANUBE/members{/member}",
    "public_members_url": "https://api.github.com/orgs/CANUBE/public_members{/member}",
    "avatar_url": "https://avatars.githubusercontent.com/u/3839808?v=3",
    "description": null
  },
  {
    "login": "MusesProject",
    "id": 6651546,
    "url": "https://api.github.com/orgs/MusesProject",
    "repos_url": "https://api.github.com/orgs/MusesProject/repos",
    "events_url": "https://api.github.com/orgs/MusesProject/events",
    "members_url": "https://api.github.com/orgs/MusesProject/members{/member}",
    "public_members_url": "https://api.github.com/orgs/MusesProject/public_members{/member}",
    "avatar_url": "https://avatars.githubusercontent.com/u/6651546?v=3",
    "description": "Muses project is funded by the EU"
  }
]

~~~

Sin embargo, no siempre se puede acceder a un interfaz REST en
abierto; casi todos los servicios web incluyen alguna forma de autenticación; una
de las formas de hacerlo es incluirlo en el propio URL, en la forma
habitual: `usuario:clave@host`; en este caso no es necesario y en la
mayoría de los API REST se usa ya autenticación OAuth en alguna
de sus formas.

En el ejemplo anterior lo único que hacemos con la respuesta es
imprimirla, tal cual, pero lo 
mejor sería extraer información útil de la misma, como vamos a hacer
en
[este programa en node.js](https://github.com/JJ/curso-js/blob/13e25e97315e58a84f268349ba61b650e7a097e3/code/github-get.js)
que actúa como cliente de un interfaz REST: 

~~~javascript
#!/usr/bin/env node

var https = require('https');

var user =process.argv[2]?process.argv[2]:'JJ';

var options = {
    host: 'api.github.com',
    path: '/users/'+user,
    method: 'GET',
    headers: {'User-Agent': 'Prueba-Node-App'}
};


var req = https.get(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (datos_JSON) {
	var datos=JSON.parse(datos_JSON);
	console.log('Login: ' + datos.login+ "\nNombre: " + datos.name + "\n");
    });
});
req.end();
~~~

Este programa descarga información de un usuario en JSON y la procesa,
usando la forma habitual de las funciones en node, que incluyen una
serie de parámetros y una función *callback* a la que se llama cuando
se completa la petición.
Toma el usuario que se pase por la línea de órdenes, o bien usa `JJ` por
defecto, dando un resultado así

~~~
jmerelo@penny:~/txt/docencia/cursos/JavaScript$ node code/github-get.js
Login: JJ
Nombre: Juan Julián Merelo Guervós
~~~

El programa hace una petición GET sin autentificar al API de GitHub y del objeto
en JSON devuelto extrae (tras su conversión en un objeto JS con
`JSON.parse` un par de variables del mismo y las imprime. El objeto
contiene muchas más cosas que no nos interesan. El [módulo `https`](http://nodejs.org/api/https.html#https_https_request_options_callback)
usado es muy similar al `http`, salvo por el protocolo usado. La
petición que se está usando es la forma más general, pero se puede usar
directamente `get` [de esta forma](https://github.com/JJ/curso-js/blob/master/code/github-get.js):

~~~javascript
var req = https.get('https://api.github.com/users/'+user,
    function(res) // continúa...
~~~

con exactamente el mismo resultado.

## Diseñando un interfaz REST

La idea de REST desde el punto de vista del servidor es usar el
URL para representar recursos, y las propias órdenes de HTTP para
ejercitar acciones sobre ese recursos. En general, `GET` servirá para
transferir la representación de un recurso del cliente al servidor,
`POST` cambiará el estado de un recurso, `PUT` (que no se suele usar tan
a menudo) directamente cambiaría la representación del recurso, mientras
que `DELETE` borraría el recurso; a estas arquitecturas se les suele
denominar también *arquitecturas orientadas al recurso*.

Por eso también se suelen proponer una serie de
[buenas prácticas para diseñar un interfaz REST](https://en.wikipedia.org/wiki/Representational_State_Transfer#Guiding_principles_of_the_interface):

-   La funcionalidad está divida en recursos
-   Se usa una sintaxis universal basada en URL
-   Todos los recursos tienen un interfaz uniforme, con un conjunto bien
    definido de operaciones y un conjunto restringido de tipos de
    contenido. En particular, este interfaz esconde los detalles de la
    implementación.

Por ejemplo, supongamos que hay que diseñar un interfaz REST para una
quiniela deportiva. Hay una quiniela por jornada, y cada jornada tiene
15 partidos. Supongamos que se conocen los partidos de antemano, y que
sólo se pueden proponer resultados por parte de un usuario. Se podría
diseñar el interfaz de la forma siguiente:

-   Quiniela de una jornada:
~~~
http://jost.com/quiniela/jornada/[número de jornada]
~~~

-   Un partido de una quiniela:
~~~
http://jost.com/quiniela/jornada/[número de jornada]/partido/[número de partido]
~~~

-   Para los resultados, habría que sustituir `quiniela` por
    `resultados`. Adicionalmente, añadir `usuario/[nombre de usuario]`,
    para recuperar los resultados propuestos por un usuario determinado.
    Por ejemplo, Resultados:
~~~
http://jost.com/resultados/jornada/22/usuario/foobar
~~~

Las operaciones HTTP que se van a usar vienen determinadas por el diseño
del interfaz. Por ejemplo, para proponer un resultado determinado habría
que hacer una petición POST con dos parámetros: el nombre de usuario y
el resultado propuesto. El servidor responderá con un mensaje estándar
HTTP y un fichero XML si se ha podido hacer correctamente, y con un
error HTTP si no.

El principal problema con este diseño RESTful es hacerlo en
la práctica. Como se ha visto a la hora de programar [CGIs](#CGI), en
general el camino a un recurso es tortuoso, y la forma como se pasan los
parámetros tiene un montón de & e signos =. Así que hay que *limpiar* el
URL de alguna forma. Dependiendo de la implementación del servidor,
quizás se puede hacer directamente; por ejemplo, en caso de que se trate
de un `.war` en un contenedor de servlets, ya se encarga directamente;
sin embargo. Algunos [CGIs](#CGI) también permiten interpretar
directamente el URL. Pero otra forma de hacerlo es usar
[`mod_rewrite`](http://httpd.apache.org/docs/2.2/mod/mod_rewrite.html),
que permite reescribir los URLs, de forma que la petición cambia de
forma antes de servirse la petición. Estos *cambios* toman la forma de
directivas del servidor; por ejemplo, en Apache podríamos usar la
siguiente dentro del fichero `httpd.conf` o el fichero de configuración
de un directorio en particular, `.htaccess`:

~~~
RewriteRule \^quiniela/(\\w+)/(\\d+)/(\\w+)/(\\d+)\$
    /\~jmerelo/REST/quiniela.cgi?\$1=\$2&\$3=\$4 [L]
~~~

Parece un poco complicada, pero no lo es. Para empezar, se cambiará la
expresión regular de la izquierda por la de la derecha. La de la
izquierda incluye palabras (\\w+) y números (\\d+), y en la expresión de
la derecha aparecen, por orden, representados por `$n`.

El hecho de que sea tan complicado diseñar interfaces REST con recursos,
como los [CGIs](#CGI), que no están preparados para ello hace que
existan marcos de aplicaciones, como los que veremos a continuación, en
los que todo esto se hace de una forma mucho más simple, trabajando
directamente con las rutas REST.

## Interfaces REST simples con express

Para diseñar interfaces REST de forma bastante simple, hay un [módulo de
node.js llamado express](http://expressjs.com/). La idea de este módulo
es reflejar en el código, de la forma más natural posible, el diseño del
interfaz REST.

Pero primero hay que instalarlo. Node.js tiene un sistema de gestión de
módulos bastante simple llamado [npm](http://npmjs.com/) que [hemos
visto en el tema anterior](#nodejs). Tras seguir las instrucciones en el
sitio para instalarlo (o, en el caso de Ubuntu, instalarlo desde
Synaptic o con apt-get), vamos al directorio en el que vayamos a crear
el programa y escribimos

~~~
npm install express
~~~


en general, no hace falta tener permiso de administrador, sólo el
necesario para crear, leer y ejecutar ficheros en el directorio en el
que se esté trabajando

Tras la instalación, el programa que hemos visto más arriba se
transforma en el siguiente:

~~~javascript
var puerto=process.argv[2]?process.argv[2]:8080;
var express=require('express'); 
var app = express(); 
app.get('/', function (req, res) { 
    res.send('Portada'); 
}); 
app.get('/proc', function (req, res) { 
    res.send('No es la portada'); 
}); 

app.listen(puerto); 
console.log('Servidor en http://127.0.0.1:'+puerto+'/');
~~~

Para empezar, `express` nos evita todas las molestias de tener que
procesar nosotros la línea de órdenes: directamente escribimos una
función para cada respuesta que queramos tener, lo que facilita mucho la
programación. Las órdenes reflejan directamente las órdenes de
HTTP a las que queremos responder, en este caso `get` y por
otro lado se pone directamente la función para cada una de ellas. Dentro
de cada función de respuesta podemos procesar las órdenes que queramos.

Por otro lado, se usa `send` en vez de `end` para enviar el resultado.
Lo que viene a ser lo mismo, `s` más o menos, aunque [`send` es más flexible](http://expressjs.com/api.html#res.send), admitiendo todo
tipo de datos que son procesados para enviar al cliente la respuesta
correcta. Tampoco hace falta establecer explícitamente el tipo MIME que
se devuelve, encargándose `send` del mismo.

Con el mismo `express` se pueden generar aplicaciones no tan básicas
ejecutándolo de la forma siguiente:

~~~
node_modules/express/bin/express prueba-rest
~~~

Se indica el camino completo a la aplicación binaria, que sería el
puesto. Con esto se genera un directorio prueba-rest. Cambiándoos al
mismo y escribiendo simplemente `npm install` se instalarán las
dependencias necesarias. La aplicación estará en el fichero `app.js`,
lista para funcionar, pero evidentemente habrá que adaptarla a nuestras
necesidades particulares.

El acceso a los parámetros de la llamada y la realización de diferentes
actividades según el mismo se denomina enrutado. En express se pueden
definir los parámetros de forma bastante simple, usando marcadores
precedidos por `:`. Por ejemplo, si queremos tener diferentes contadores
podríamos usar el [programa siguiente](https://github.com/JJ/curso-js/blob/master/code/express-count.js):

~~~javascript
var express=require('express');
var app = express();
var contadores = new Array;
var puerto=process.argv[2]?process.argv[2]:8080;

app.get('/', function (req, res) {   
	res.send('Portada');
});

app.put('/contador/:id', function( req,res ) {
    contadores[req.params.id] = 0;
    res.send( { creado: req.params.id } );
});

app.get('/contador/:id', function (req, res) {   
    res.send( "{ "+req.params.id+": "+ contadores[req.params.id] + "}"  );
});

app.post('/contador/:id', function (req, res) {   
    contadores[req.params.id]++;
    res.send( "{ "+req.params.id+": "+ contadores[req.params.id] + "}"  );
});

app.listen(puerto);
console.log('Server running at http://127.0.0.1:'+puerto+'/');
~~~

Este [programa (express-count.js)](https://github.com/JJ/curso-js/tree/master/code/express-count.js%27)
introduce otras dos órdenes REST: PUT, que, como recordamos, sirve para
crear nuevos recurso y es idempotente (se puede usar varias veces con el
mismo resultado), y además POST. Esa orden la vamos a usar para crear
contadores a los que posteriormente accederemos con get. PUT no es una
orden a la que se pueda acceder desde el navegador, así que para usarla
necesitaremos hacer algo así desde la línea de órdenes:

~~~
curl -X PUT http://127.0.0.1:8080/contador/primero
~~~

para lo que
previamente habrá que haber instalado `curl`, claro. Esta orden llama a
PUT sobre el programa, y crea un contador que se llama `primero`. Una
vez creado, podemos acceder a él desde la línea de órdenes o desde el
navegador (desde el navegador se generan peticiones GET y POST
solamente).

## Clientes REST

Tampoco es complicado escribir con node.js un cliente REST. Se puede
hacer mediante peticiones HTTP, pero por supuesto es más fácil escribir
un cliente usando la librería
[restler](https://github.com/danwrong/restler), que se instala de la
misma forma que hemos visto anteriormente con `npm`. Una vez instalada,
se puede escribir un cliente como este al utilísimo crea-contadores
anterior.

~~~javascript
var rest = require('restler'); 
var url = 'http://127.0.0.1:8080/contador/'; 
process.argv.forEach(function (val, index, array) { 
    if ( index > 1 ) { 
	rest.put( url + val ).on('complete', function( data ) { 
	    console.log( data ); 
	} ); 
    } 
});
~~~

El cliente es bastante simple, y lo que hace es crear tantos contadores
como argumentos le pasamos por la línea de órdenes. Tras definir un par
de variables (ojo con la segunda, tiene que contener el URL del sitio
donde vamos a hacer la consulta, el número y la dirección puede ser otro
cualquiera, lo que no variará será `contador` si estamos usando el
programa anterior), usamos la variable `process.argv` que contiene los
argumentos de la línea de órdenes.

Sobre ese objeto ejecutamos un bucle, `forEach` recorre los elementos de
un objeto llamando sobre cada uno de ellos una función con tres
argumentos: el índice y el elemento que se está recorriendo en ese
momento, y el array completo, que en este caso no vamos a usar. Además,
los argumentos están en realidad a partir del segundo elemento; los dos
primeros contienen el camino a node y el camino completo al programa que
se está ejecutando.

La clientela REST se usa con `rest.put`. Vamos a crear un contador con
el nombre `val` que se envía desde la línea de órdenes, para lo que
creamos el URL del mismo simplemente concatenando las dos cadenas.

Recordemos que node.js actúa de forma asíncrona, por lo que lo que
hacemos con esa orden es crear un callback cuando (*on*) la petición se
haya completado (*complete*). Ese callback simplemente te dice cual ha
sido la respuesta y la imprime.

## Usando Ajax

Aunque inicialmente [Ajax](https://es.wikipedia.org/wiki/Ajax) era un
acrónimo de *Asynchronous JavaScript and XML*, hoy en día se ha dejado
de usar como tal y viene a abarcar todas las tecnologías asíncronas de
interacción cliente servidor, usando cualquier formato de serialización
(aunque más generalmente JSON) y en el cliente (aunque generalmente se
trata de JavaScript, pero puede ser también Dart u otro lenguaje
insertado en el navegador, como Java).

Con lo visto hasta ahora ya podemos intentar hacer un programa cliente
con otro servidor en Ajax. En algún tema anterior hemos introducido la J
de JavaScript; también hemos visto como trabajar con JSON desde el
servidor, que sería la X, y nos falta la A. A se refiere a Asíncrono, y
se trata de que las peticiones desde el cliente (el navegador) no lo
bloqueen mientras el servidor contesta (si lo hiciera, para el caso se
podría generar una página nueva cada vez que se hiciera cualquier
interacción). En la práctica, el Ajax se basa en una clase de
JavaScript, `XMLHttpRequest`, que hace una petición al servidor, y crea
un evento que se dispara en el navegador cuando se produce la respuesta.
Puede haber varias peticiones de este estilo funcionando
simultáneamente, de forma que el navegador se comporta, en realidad,
como si se tratara de un interfaz de usuario.

Un programa Ajax, por tanto, tiene dos partes. La parte servidor se
suele programar habitualmente para que responda a un interfaz REST, pero
esto es simplemente una convención. Podíamos, por ejemplo, usar los
programas que hemos visto anteriormente

En cuanto al cliente, hay que tener en cuenta que únicamente se pueden
hacer peticiones al mismo dominio desde el que se ha descargado la
página en la que se haya inserto. Es decir, sólo puedes hacer peticiones
a `dominio.com` desde páginas que te hayas descargado desde
`dominio.com`. Por eso es importante que el sistema que tenga el
API REST sea capaz también de servir las páginas; es lo que
vamos a hacer en el siguiente ejemplo. Necesitaremos tres ficheros para
ejecutar el programa. El primero es el [servidor en node.js](https://github.com/JJ/curso-js/tree/master/code/count-server.js):

~~~javascript
var fs = require('fs');
var express=require('express');
var app = express();
var contadores = new Array;
var portada = fs.readFileSync('sumar_formulario.html','utf8');

app.get('/', function (req, res) { 
    res.send(portada);
});

app.get('/js/:page', function (req, res) { 
    var js = fs.readFileSync(req.params.page);
    res.contentType('text/javascript');
    res.send(js);
});

app.put('/contador/:id', function( req,res ) {
    contadores[req.params.id] = 0;
    res.send('Creado contador '+ req.params.id );
});

app.post('/contador/:id', function (req, res) {   
    contadores[req.params.id]++;
    res.contentType('application/json');
    res.send( { resultado:  contadores[req.params.id] } );
    console.log( { 'Post':  contadores} );
});

app.get('/contador/:id', function (req, res) {   
    res.contentType('application/json');
    res.send( "{ 'resultado': " + contadores[req.params.id] + "}\n" );
});


app.get('/suma/:id1/:id2', function (req, res) {   
    res.send( { resultado: contadores[req.params.id1] +  contadores[req.params.id2]} );
});

app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
~~~

Este código es similar al que hemos usado anteriormente, salvo que
respondemos a más comandos REST: GET, PUT y POST. PUT crea el contador,
POST lo incrementa y finalmente GET obtiene el resultado; recordemos que
GET debe ser idempotente y dejar al servidor en el mismo estado. Estos
dos últimos, además, devuelven el resultado en JSON, y no en texto. Lo
normal sería que entendieran varios formatos (incluyendo texto y HTML),
pero por lo pronto lo dejaremos así.

También hay que tener en cuenta que este servidor tiene que servir
*todos* los ficheros, no sólo el API REST. Por eso se ha creado
otro seudo-comando que lee un fichero y lo sirve como JS. Ojo, este tipo
de órdenes son un potencial hueco de seguridad. Lo dejamos así por
simplicidad, no porque sea la forma adecuada que debería tener una
aplicación en producción.

La [página web](https://github.com/JJ/curso-js/tree/master/code/sumar_formulario.html)
incluye lo mínimo necesario: el script JS incluido y un formulario para
solicitar el nombre del contador que se va a incrementar. El URL del
formulario incluye el "camino" ficticio al que responderá el servidor
REST, que incluye `js`. Ese fichero, precisamente, es el que vemos aquí:

~~~~~javascript
var request;
function cuenta() {
  request = new XMLHttpRequest();
  var contador=document.getElementById('contador').value;
  var peticion_str = '/contador/'+contador;
  request.open('POST', peticion_str , true);
  request.onreadystatechange= escribe_resultado ;
  request.send(null);
}

function escribe_resultado(){
  if ( request.readyState == 4 ) {
    if ( request.status == 200 ) {
	var json;
	eval ( 'json = '+ request.responseText );
	console.log(json);
	document.getElementById('Resultado').innerHTML= 'Resultado = '+ 
	    json.resultado
    }
  }
}
~~~~~

Por lo pronto vemos cómo funciona en JS "clásico", para entender un poco
mejor el mecanismo que sigue. Luego más adelante veremos que en JQuery
se puede hacer de forma mucho más simple. El código tiene dos funciones:
la que hace la llamada (`cuenta`) y la que responde a la misma, el
callback (`escribe_resultado`). La primera construye el URL y hace la
petición POST para incrementar el contador, y con `onreadystatechange`
establece la llamada para cuando llegue asíncronamente el resultado.

Esta segunda función recibe el JSON y usa un simple evaluador para
extraer su resultado, previa comprobación de que efectivamente se ha
recibido la respuesta completa y de forma efectiva; la respuesta la
escribe en un `div`.

Para hacer funcionar este programa tendremos que crear previamente los
contadores usando cualquier otro programa

En realidad, es mucho más fácil hacerlo con JQuery. En [esta web de Codeko](http://codeko.com/docs/oslgr/intro_jquery/ajax2.php) muestran
como funcionan las órdenes básicas. El [formulario sería bastante similar](https://github.com/JJ/curso-js/tree/master/code/formulario-jquery.html),
aunque hemos tenido que
[modificar el servidor para que muestre diferentes páginas principales](https://github.com/JJ/curso-js/tree/master/code/count-server-var.js).
El principal cambio será, obviamente, en el código usado para la
solicitud Ajax, que usará jQuery en vez de JS puro. [Helo aquí](https://github.com/JJ/curso-js/tree/master/code/cuenta-jquery.js):

~~~javascript
$(document).ready(function() {
	$("#formulario").change(function(){
		$.get('/contador/'+$('#contador').val(), function( data) {
			  $('#Resultado').html('Resultado '+ data.resultado);
		      });
	});
} );
~~~


Este pequeño programa tiene todo lo compacto y críptico a lo que nos
tiene acostumbrados jQuery. Como es habitual, se ejecuta sólo cuando se
ha cargado la página y usa el programa para añadir funcionalidad,
eventos, al HTML en vez de tener el propio evento definido en el mismo;
lo clásico en JS (y jQuery) es dividir el código de la funcionalidad. Lo
que hace es que crea un evento sobre el formulario tal que al cambiar
llame a una función anónima.

Esa función, en un par de líneas, hace lo mismo que previamente con unas
cuantas líneas en JS: hace una petición `get` (en la que usa también los
selectores jQuery para extraer el valor, contenido en \$val()\$, del
elemento del formulario) y una vez obtenido el resultado usa el selector
del elemento correspondiente, `#Resultado`, para insertarlo.
Adicionalmente, jQuery esconde el mecanismo subyacente de llamada
haciéndolo independiente del navegador. Si XMLHttpRequest funciona, lo
usa; si no, usa el mecanismo nativo.

## Más allá del Ajax

Ajax permite trabajar con el servidor de forma asíncrona, pero siempre
que sea el cliente el que comience la conexión. En muchos casos puede
que no sea la forma más eficiente de trabajar con él, porque se tienen
que hacer peticiones de forma periódica y porque puede haber picos en
los que se sature el mismo. Por eso hay métodos para que sea el servidor
el que inicie, o al menos envíe información al cliente; a esto se le le
suele llamar tecnologías *push* (desde el punto de vista del servidor) y
[Comet](http://en.wikipedia.org/wiki/Comet_%28programming%29) desde el
punto de vista del cliente.

La idea, por tanto, es que tras el comienzo de una conexión por parte
del cliente, sea el servidor el que continúe enviando información al
mismo, sin cerrarla. Hay diferentes formas de hacerlo: mediante
streaming y utilizando lo que se denomina *long polling* .

Lo anterior se suele implementar con una serie de tecnologías ad hoc,
que tratan de evitar los modelos de seguridad del cliente de diferentes
formas. Pero hay un estándar emergente denominado
[WebSocket](http://en.wikipedia.org/wiki/WebSocket) que es simplemente
una conexión TCP bidireccional entre cliente y servidor, el equivalente
en el navegador de un Socket tradicional. Actualmente no todos los
navegadores admiten todos los tipos de conexión propuestos; se trata de
un estándar en evolución que se ha implementado a partir de 2012.

Para usarlo ya se puede probar con librerías como
[socket.io](http://socket.io/), que proporcionan todas las
facilidades de WebSocket mediante la conexión que esté disponible en el
navegador.

Un ejemplo de como usar estas librerías está en [este tutorial](http://project70.com/nodejs/node-js-comet-real-time-chat-a-great-first-project/)
que muestra como llevar a cabo un chat en tiempo real usando node.js.

## A dónde ir desde aquí

Se puede ir a
[aprender el uso de un sistema de almacenamiento de objetos llamado CouchDB](http://geneura.ugr.es/%7Ejmerelo/asignaturas/AAP/AAP-CouchDB.mhtml),
pero el tema de diseño de sistemas con node.js y JQuery en el cliente
puede ir mucho más allá, usando, por ejemplo [marcos MVC para node.js como Sails.js](http://sailsjs.org) o [cualquier otro de los recomendados.](http://nodeframework.com/)

jQuery también admite todo tipo de plugins, y muchos de ellos se pueden
usar con [formularios](http://malsup.com/jquery/form/) haciendo su
procesamiento mucho más rápido. Siempre hay una forma más simple de
hacer las cosas y posiblemente hay software libre para solucionarlo.

## Bibliografía y enlaces

En general, REST se considera, de forma amplia, dentro de los servicios
Web, por eso los libros que trabajan con él, en general, también
incluyen capítulos que tratan con REST. Sin embargo, si quieres usar un
lenguaje de programación determinado, te puede venir bien
[Programming Web Services with Perl, de Ray y Kuchenko](http://www.amazon.com/gp/product/0596002068?ie=UTF8&tag=perltutobyjjmere&link_code=as3&camp=211189&creative=373489&creativeASIN=0596002068).
Es quizás un poco más prolijo en el apartado XML de la cuenta, y está un
tanto atrasado, pero vienen todos los módulos de Perl bien detallados y
explicados. El [RESTful Web Services Cookbook](https://www.amazon.es/dp/B0043D2ESQ/ref=as_li_ss_til?tag=atalaya-21&camp=3634&creative=24822&linkCode=as4&creativeASIN=B0043D2ESQ&adid=1V5KDS1RVBZAE2W5B2PR&)
también es bastante útil en este sentido.

