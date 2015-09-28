# Introducción a node.js {name="nodejs"}


##Objetivos de este capítulo

-   Conocer node.js y saber sus conceptos fundamentales.
-   Aprender los conceptos básicos de los servicios web basados en
    [REST](#REST), la representación de datos usada y cómo
    implementarlos en node.js
-   Realizar prototipos rápidos de cliente y servidor de servicio web
    usando node.js

## Node.js, un intérprete asíncrono para JS

La aceptación de JS como un lenguaje de programación procede del hecho
de su incorporación en diferentes herramientas de propósito general,
sobre todo a partir de haberlo desgajado del navegador en e introducido
en herramientas como las que hemos comentado anteriormente. Una de tales
herramientas es [Node.js](http://nodejs.org/), un marco para
programación de eventos asíncrono que usa como base JS. Se puede usar
directamente como intérprete de JS (tal como hemos hecho [en este otro
tutorial](http://geneura.ugr.es/%7Ejmerelo/tutoriales/servicios-web)),
salvo por el hecho de que está preparado para trabajar de forma
asíncrona, por lo que un patrón habitual de comportamiento, que es
asignar la salida de una orden a una variable, se convierte aquí en la
creación de un *callback*, es decir, de una función a la que se llama
una vez que se complete la acción que se ha solicitado. No es que sea
algo extraño dentro del mundo JS, puesto que es la misma forma de
trabajar que tiene [JQuery](#jquery).

En todo caso, node.js incluye una serie de bibliotecas básicas que
convierten JS en un lenguaje de propósito general, algo que le falta a
otros intérpretes como Rhino, que necesita usar librerías de Java para
poder hacer cosas básicas como abrir ficheros. Empecemos pues, por el
principio: instalar node.js, lo que se puede hacer en Linux fácilmente
con `sudo apt-get install nodejs`, desde los repositorios, o
[descargándoselo desde su web](http://nodejs.org/download/). Conviene
usar este último método, porque es un lenguaje en evolución constante,
de forma que los repositorios de Linux van siempre un poco por detrás.

No hace falta instalar node.js para empezar a usarlo. Algunos PaaS como
[Heroku](http://heroku.com) te proporcionan tanto una serie de
herramientas para prototipar y publicar aplicaciones basadas en node.js
como una línea de órdenes de la que usarla directamente.

Por otro lado, otra opción conveniente es [instalar
`nave`](https://gist.github.com/isaacs/579814), un entorno virtual que
permite trabajar simultáneamente con diferentes versiones de node y,
sobre todo, tener la última versión, más allá de la que proporcione la
distribución.

Como última opción de instalación en una máquina *limpia* que use Linux
(lo que debería ser obvio, Windows automáticamente ensucia la máquina en
la que se instala) se pueden seguir [estas
instrucciones](https://gist.github.com/JJ/8459799) para instalar los
prerrequisitos y la última versión de node.

Para terminar, hay algunos sitios en Internet que permiten ejecutar,
directamente desde el navegador, un terminal sobre una máquina virtual;
algunos incluyen node.js ya instalado de serie. Por ejemplo,
[Koding](http://koding.com/R/jjmerelo) permite abrir un
[terminal](https://koding.com/Terminal "tendrás que
          estar conectado para que esto funcione") donde, además, puedes
dejar ejecutándose tus programas y acceder a ellos desde fuera.

En este tutorial aconsejamos trabajar con Linux; por lo que será
conveniente o bien que te instales cualquier tipo de distribución o
tengas acceso a una máquina virtual en tu propio ordenador o en la nube,
como la que proporciona [koding.com](http://koding.com/R/jjmerelo)

Seguimos haciendo nuestro primer programa, un [programa simple
(guenas.js)](https://github.com/JJ/curso-js/blob/master/code/guenas.js)
en `node.js` y ejecutémoslo.

~~~~~javascript
#!/usr/local/bin/node

var saludo = new Object;
saludo.hola = 'mundo';
saludo.adios ='muy buenas';
console.log( saludo );
~~~~~

La primera línea es exclusivamente para sistemas Linux (que son, por
otro lado, los únicos serios para desarrollo de software); en ella habrá
que poner el camino completo al intérprete de node; este es una opción,
como `/usr/local/bin/node` u `/usr/bin/env node` en el caso de usar
`nave`; con ella y haciendo ejecutable el fichero con `chmod +x node.js`
podemos ejecutarlo y obtener el siguiente resultado

~~~~~
jmerelo@penny:~/servicios-web/ejemplos$  ./guenas.js
{ hola: 'mundo' }
~~~~~

En otro entorno (o si no se quiere hacer al fichero ejecutable), con
escribir

    jmerelo@penny:~/servicios-web/ejemplos$  node guenas.js 

es suficiente. En cualquier caso, la salida será la misma. Y la
explicación también: definimos un objeto `saludo` en la primera línea, y
en la segunda le asignamos el valor `mundo` a la variable de instancia
`hola`, o visto de otro modo, el valor `mundo` a la clave `hola`.
`console.log` imprime la cadena en la salida, escribiendo directamente
(y además en JSON) el valor de la misma. `console` es un objeto que
forma parte de la [librería estándar de entrada salida de
node](http://nodejs.org/api/stdio.html%20). Equivale a la *consola* o el
terminal, permitiendo enviar información a la misma con `log` y con
otras órdenes como `error`; la diferencia es que en el primer caso se
escribe en salida estándar y en el segundo en salida de error estándar
(no se capturaría en una redirección de salida, por ejemplo).
`console.log` puede usar también [formatos como la orden `printf` de
C](http://nodejs.org/api/stdio.html#stdio_console_log_data), es decir,

    console.log('Respuesta: %s', saludo.hola     )

como hacemos en [este
programa](https://github.com/JJ/curso-js/blob/master/code/guenas-nave.js).
El objeto `console` existe en la mayoría de los navegadores modernos y
especialmente en Chrome/Chromium, pero el resultado saldrá por la
*consola* del navegador que forma parte de las herramientas del mismo;
se le denomina *herramientas de desarrollador* o *consola de
JavaScript*.

Sin embargo, node.js no es un intérprete habitual, tiene una forma
particular de hacer las cosas: asíncronamente. Veremos, por ejemplo,
como [leer un
fichero](http://docs.nodejitsu.com/articles/file-system/how-to-read-files-in-nodejs),
el de las quinielas que hemos usado hasta ahora.

~~~~~javascript
#!/usr/bin/env node

var fs = require('fs');
fs.readFile('quiniela.datos', 'utf8', 
	    function(err,datos) {
		if (err) {
		    return console.log(err);
		};
		var filas = datos.split("\n");
		for ( var f in filas ) {
		    var cachos = filas[f].split(" ");
		    var partido = { 'local': cachos[0],
				    'visitante': cachos[1],
				    'resultado': cachos[2] };
		    console.log( partido );
		}
	    }
);
~~~~~

En este
[programa](https://github.com/JJ/curso-js/blob/master/code/lee-quiniela.js)
(que actúa sobre [este fichero de
datos](https://github.com/JJ/curso-js/blob/master/code/quiniela.datos))
se usa el intérprete node.js, lo que se ve en la primera línea, que no
hace falta en Windows (aunque se tendrá que ejecutar desde línea de
órdenes poniendo explícitamente node fichero.js). En la segunda vemos
que se carga una librería usando `require`, el [mecanismo
común](T1:t1:common) para cargar un módulo y evaluarlo, que, además,
crea un objeto que se puede usar; lo usamos más adelante para leer un
fichero. [`fs` se refiere a
*filesystem*](http://nodejs.org/api/fs.html), o sistema de ficheros, y
es el módulo que contiene una serie de funciones para interaccionar con
el mismo.

La siguiente línea es la que usa un modo de actuación propio de node.js.
Como ya se ha indicado (varias veces), node funciona de forma asíncrona.
En general, el patrón de las funciones en node, en vez de ser
`haz_a(); haz_b();`{.ejemplo} que ejecutaría `haz_a`, y, tras terminar,
ejecutaría `haz_b`, es `haz_a(parametros, haz_b); haz_c()`{.ejemplo} que
viene a decir ejecuta `haz_a` sobre unos `parametros` y, cuando veas que
has terminado, llama a la función `haz_b`; fijaros que se trata de un
puntero a función, no una llamada a la misma (no lleva paréntesis). Pero
dependiendo de lo que tarde `haz_a`, `haz_c` podría ejecutarse antes que
`haz_b`. En general, la secuencia de las líneas no tiene por qué ser la
secuencia de ejecución de las funciones, eso es precisamente lo que
significa la asincronía. Eso no quiere decir que no se pueda usar como
cualquier otro lenguaje, sólo que hay que tener cuidado y usar patrones
de programación específicos. Y, por otro lado, permite responder muy
rápidamente a eventos sin bloquear la operación; cada evento inicia una
hebra y se van procesando en paralelo.

Vamos a la orden específica: efectivamente, con `readFile` leemos el
fichero. Los dos primeros argumentos son el nombre del fichero y, a
continuación, la codificación, que es obligatorio usar (bueno, más o
menos: [si no se da la codificación, te devuelve un buffer, no el
contenido del
fichero](http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback)).
Y continuación el *callback* del que hemos hablado: una función que se
ejecuta cuando se termine; se trata de una función anónima tal como las
que hemos visto en apartados anteriores. El hecho de que se ejecute
asíncronamente quiere decir que fs.readFile se ejecuta y se deja el
evento generado; si hubiera una orden a continuación se ejecutaría
inmediatamente. Esto le permite a `node.js` leer las cosas con mucha
eficiencia, y hacer una serie de operaciones que no se pueden hacer
fácilmente con otros lenguajes.

Concentrémonos en la función. Tiene dos argumentos: `err` y `datos`. Si
hay un error, estará en la primera variable (que comprobamos) y si no,
el resultado irá a la segunda variable. Es decir, cuando se ejecute la
acción, se llamará a la función con dos argumentos, uno de los cuales
será `null`. Vemos también que se usa `console.log` para escribir en la
consola; `console` es un objeto que equivaldría al `document` del DOM,
salvo que no tiene ningún tipo de estructura; tiene la ventaja de que si
se escribe una estructura de datos compleja, la "desplegará".

El resto del programa es más o menos habitual; usamos la clase que hemos
definido anteriormente para genera un objeto de cada tipo e imprimirlo
usando `console.log`. El resultado será más o menos así:

~~~~~
{ local: 'Madrid', visitante: 'Barça', resultado: 'x' }
{ local: 'Atleti', visitante: 'Barça', resultado: '1' }
{ local: 'Athleti', visitante: 'Recre', resultado: '1' }
{ local: 'Depor', visitante: 'Athleti', resultado: '2' }
{ local: 'Elche', visitante: 'Hércules', resultado: 'x' }
{ local: 'Cai', visitante: 'Madrid', resultado: 'x' }
{ local: 'Graná', visitante: 'Recre', resultado: '1' }
~~~~~

Es decir, los datos leídos en formato JSON.

## `npm`, instalación de módulos en Node

`fs` es sólo el principio de una serie de módulos muy interesante; de
hecho, es un módulo que se instala por omisión. Hay un módulo para crear
servidores web, pero lo veremos más adelante (sólo para tener una idea
se puede visitar [nodetuts](http://nodetuts.com/)). En el [sitio de
descarga de nodejs](http://nodejs.org/docs/latest/api/index.html) vienen
también todos los módulos disponibles, que permiten trabajar con el
sistema operativo y cosas más avanzadas como una interfaz criptográfica.
Pero si se quieren instalar más módulos, una de las características más
interesantes de node es que tiene su propio gestor de paquetes, `npm`.
Hay que [seguir las instrucciones para instalarlo](http://npmjs.org/) y
una vez hecho tener en cuenta que los módulos se instalan por omisión en
el directorio superior al que uno está trabajando. La [lista de todos
los paquetes está en línea, y contiene módulos para la mayoría de los
servicios web y aplicaciones actuales.](https://npmjs.org/)

Instalemos por ejemplo [`request`](https://github.com/mikeal/request),
una de las librerías más populares, que actúa como cliente de
[HTTP](#HTTP). Una vez instalado npm, se escribe (en el directorio donde
lo vayamos a usar, en general; la política de módulos de Node es tener
los módulos instalados junto con la aplicación que los usa, en vez de en
un sitio centralizado) `npm install request`. Esta orden, si la conexión
a Internet está disponible, descargará e instalará el módulo en el
directorio desde la que la llamemos. Si se ejecuta por primera vez,
creará un directorio `node_modules`, dentro del cual habrá un directorio
`request`.

Con `request` podemos codificar todo tipo de peticiones [REST](#REST). A
un nivel muy básico se puede usar de la forma siguiente, en el programa
[`github-get.js`](https://github.com/JJ/curso-js/blob/master/code/github-get.js),
que pide información sobre un usuario en GitHub:

~~~~~~javascript
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
	console.log(datos_JSON);
	var datos=JSON.parse(datos_JSON);
	console.log('Login: ' + datos.login+ "\nNombre: " + datos.name + "\n");
    });
});
req.end();
~~~~~~

Usamos la librería recién instalada para descargarnos información de un
usuario de [GitHub](https://GitHub.com), usando la librería llamada
\$JSON\$, que se instala con Node. La forma de petición es la asíncrona
habitual en Node: se hace la petición y se le pasa la función a la que
hay que llamar cuando se reciba la respuesta, como en el caso anterior
de apertura de un fichero. A la función se la llama con tres parámetros:
o bien `err`, en caso de que se produzca un error, o bien `response` y
`body` en caso de que la respuesta sea correcta. `body` contendrá el
texto de la respuesta, que habrá que decodificar (o imprimir tal cual,
en caso de que se trate de HTML); `response` es una estructura de datos
compleja, que podemos imprimir con `console.log` (y saldrá un montón de
cosas, incluyendo la versión de [HTTP](#HTTP), las cabeceras, y mucha
información más), pero que contiene, entre otras cosas, el estado de la
petición, con un código del protocolo [HTTP](#HTTP). En el programa
anterior se comprobaba sólo si había error o no; ahora demás comprobamos
que el código devuelto es el correcto, es decir, 200. Si hubiera un
código 400, o 500, o incluso un 201, tendríamos que interpretar la
respuesta de otra forma.

## Usando un servidor web

Para enviar respuestas a una petición web hay que hacerlo desde un
servidor. La tendencia moderna es hacerlo desde un entorno integrado,
sin embargo los servidores web multifunción permiten tanto ofrecer
páginas web estáticas como webs dinámicas, y además hacerlo desde una
variedad de lenguajes de programación; por eso conviene conocer, al
menos, cómo instalar un servidor web simple y hacer programas que
funcionen desde él con facilidad.

El clásico [Apache](http://httpd.apache.org/) sigue usándose
extensivamente, aunque últimamente se están empezando a usar otras
opciones como el [nginx](http://nginx.org/), un servidor web de altas
prestaciones que se puede instalar, además, en todo tipo de plataformas
(aunque este último no puede ejecutar, de forma directa, los
[CGIs](#CGI) de los que hablamos en este apartado). Tanto uno como otro
están disponibles en los repositorios de las distribuciones Linux más
comunes.

Un servidor web se instala como un servicio (es decir, un programa que
se queda ejecutándose en memoria permanentemente) y *escucha* un puerto
TCP/IP, normalmente el 80; este puerto, en Linux, está reservado (como
todos hasta el 999) al superusuario, así que hay que ejecutarlo con esos
privilegios. Una vez instalado se pueden servir tanto páginas estáticas
(habrá que consultar en la documentación para ver cuál es el directorio
configurado para hacerlo) como dinámicas (una vez más, también hay que
consultar cuál es el directorio por omisión). Las páginas estáticas se
sirven (más o menos) tal cual, y las dinámicas se generan a partir de la
ejecución de un programa desde el servidor, con los privilegios del
mismo o los que tenga configurados. Esto lo veremos más adelante, pero
la idea principal es que los recursos accesibles al servidor web están
en una serie de directorios cuyo valor lo calcula el servidor a partir
del URL que se le solicita.

Para servir contenidos desde un programa, la forma habitual es copiar el
programa con la extensión .cgi al directorio que se haya configurado
para ello. De la forma más simple posible un CGI escrito en node.js
podría ser el siguiente:

~~~~~
#!/usr/bin/node
//cabecera
console.log('Content-Type: text/plain; charset=UTF-8');
//contenido
var una_variable=['uno','dos',{ tres: 'tres'}];
console.log('');
console.log(una_variable);
~~~~~~

Para ejecutarlo no hay más que copiarlo a un directorio determinado con
permisos de ejecución para otros (`chmod +x hola-js.cgi`).La primera
envía una cabecera al cliente que le indica el tipo que se usa; la
segunda parte es la que efectivamente envía el contenido, en este caso
una variable en JSON (recordad que console.log escribe en salida
estándar, y convierte las estructuras de datos a JSON).

> Node, por su naturaleza asíncrona, realmente no es el mejor sistema para
> trabajar con JavaScript en un servidor que incluya otros lenguajes. Sin
> embargo, se puede usar JavaScript de muchas maneras diferentes:
> [DecafJS](https://github.com/decafjs/decaf), por ejemplo, es un intérprete de JS
> que incluye también un servidor web; o
> [TeaJS](https://github.com/ondras/TeaJS/), que está un tanto abandonado y es un sistema para crear
> [CGIs](#CGI) basado en el intérprete rápido de JS de Google. Por no
> introducir más herramientas, no los vamos a ver aquí, pero conviene
> tener en cuenta que existen este tipo de soluciones que pueden convivir
> en un servidor como Apache o NGINX con otros lenguajes como Ruby o Perl.

## node.js como servidor

Crear un servidor web con node.js es tan simple que venía directamente
en [su página principal](http://nodejs.org/) hasta hace nada

~~~~~javascript
var http=require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Ahí estamos\n');
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');
~~~~~

Este
[programa](https://github.com/JJ/curso-js/blob/master/code/servidor.js)
simplemente escribirá "Ahí estamos" en el navegador cuando se solicite
el URL. Nada complicado, pero tampoco lo es el programa: se usa un
[módulo `http`](http://nodejs.org/api/http.html) que es estándar en Node
en la primera línea del programa; se crea un servidor con
`createServer`. Esta orden recibe como parámetro la función a la que hay
que llamar cada vez que se reciba una petición. Cuando se recibe una
petición, se llama a una función que escribe primero la cabecera
[HTTP](#HTTP) (`writeHead`) y termina (`end`) el servicio de la misma
escribiendo el contenido que nos aparecerá en el navegador.

`http.createServer` crea un objeto y lo devuelve; en este caso, no lo
asignamos a ninguna variable, sino que sobre el mismo objeto (anónimo)
le decimos con `listen` en qué puerto (8080) y dirección (la del propio
ordenador, *there's no place like 127.0.0.1*) va a escuchar el servidor.
Es una orden que se ejecuta de forma asíncrona, con lo que lo que crea
es un *callback* que se llamará cada vez que se llame a ese URL. Sólo
los puertos por encima de 1024 están accesibles al usuario, así que
tendréis que usar un número en ese rango (como 8080 o 12121, todos por
debajo de 65535). El mensaje se escribe en pantalla de forma síncrona,
es decir que a partir de que se escriba ese mensaje sabremos que podemos
usar el servidor.

Evidentemente, si queremos crear un servidor que haga *algo* tendremos
que usar las peticiones que se reciban para dar una respuesta variable.
En el
[programa](https://github.com/JJ/curso-js/blob/master/code/servidor-var.js)

~~~~~javascript
var http=require('http'); 
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.end('Ahí estamos ' + req.url); 
}).listen(8081, '127.0.0.1'); 
console.log('Servidor ejecutándose en http://127.0.0.1:8081/');
~~~~~

La principal diferencia entre este programa y el anterior es, aparte del
puerto usado (8081 en vez de 8080) la línea en la que escribe algo, y en
la que usa la variable `req`, un
[objeto](http://nodejs.org/api/http.html#http_event_request) que
contiene información sobre la petición, y entre otras cosas el URL (una
vez eliminada la parte del servidor) que se ha usado; este URL es el que
se escribe a continuación de "Ahí estamos", tal cual.

En general, para programar un servicio web habrá que trabajar con esa
petición (que será la que reciba la orden del [API](#API)) y actuar
según la misma, y teniendo en cuenta también la orden [HTTP](#HTTP) que
se use (PUT, GET o la que sea). Esto lo veremos un poco más adelante.

A partir de ahí se puede construir un mínimo interfaz [REST](#REST) para
responder a una serie de peticiones. La idea básica es que las funciones
a las que tendremos que llamar estarán identificadas por el URL que se
use para pedirlas. Por ejemplo, el programa
[rest-minimo.js](https://github.com/JJ/curso-js/blob/master/code/rest-minimo.js)

~~~~~javascript
#!/usr/bin/env node

var http=require('http'); 
var puerto=process.argv[2]?process.argv[2]:8080;
http.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    var split_url=req.url.split("/"); 
    if ( split_url[1] == '' ) { 
	res.end('Portada'); 
    } else if ( split_url[1] == 'proc' ) { 
	res.end('No es la portada'); 
    } else { 
	res.end('No entiendo la petición'); 
    } 
}).listen(puerto, '127.0.0.1'); 
console.log('Server running at http://127.0.0.1:'+puerto+'/');
~~~~~

En este programa procesamos, no sólo imprimimos, la variable `req`. Es
una estructura de datos con un montón de cosas (insertad un console.log
si queréis verlo), pero de la que vamos a usar solamente el camino. La
idea es que el URL lo que describe es un recurso, no un fichero, así que
nosotros procesamos el URL partiéndolo en sus diferentes componentes. Si
en el primer componente no hay nada, damos la portada; si hay, por
ejemplo, `proc`, haríamos otra cosa diferente, y eventualmente si se
trata de un URL desconocido devolvemos un mensaje diferente.

Adicionalmente, hemos introducido en este programa un puerto que se toma
de la línea de órdenes. `process.argv` contiene información sobre la
línea de órdenes y otras cosas; en el 2º elemento es donde está,
precisamente, el primer argumento de la línea de órdenes. El puerto por
omisión será 8080 (lo que se ve en la segunda línea), pero si se pasa
algún argumento (y es un puerto válido) se usará ese valor.

Algunos sitios web como [Heroku](http://www.heroku.com/) o
[Nodester](http://nodester.com/) permiten publicar de forma gratuita
aplicaciones web hechas con node.js. Pueden ser bastante útiles para
crear prototipos o para hacer pruebas, incluso para alojar prácticas de
alguna asignatura o curso.

## Para finalizar

Hay muchas más cosas que se pueden hacer con Node. Por ejemplo, un
[gestor de ventanas](https://github.com/mixu/nwm). Con
[appjs](http://appjs.org/) puedes construir aplicaciones
cliente-servidor con su propia ventana, igual que con el más veterano
[node-webkit](https://github.com/rogerwang/node-webkit).

Si se quiere trabajar principalmente en el navegador,
[jQuery](http://jquery.com/) funciona de forma muy similar a node: es un
entorno asíncrono para crear aplicaciones desde el navegador fácilmente,
sin tener que escribir demasiado código JavaScript. Trasladar un
programa de node a JQuery, es bastante directo, y existen diversidad de
ampliaciones (plugins) para jQuery que hacen la vida (todavía) más
fácil.

Por otro lado, cualquier lenguaje de scripting como Python o Perl
permite crear también arquitecturas cliente y servidor, sólo que no se
pueden incluir en el navegador (o usar la experiencia que tenemos con el
mismo). Sin embargo, especialmente cuando se trate sólo de consumir
servicios web, pueden ser la opción más adecuada.

En cuanto a recurso para hacer preguntas y obtener respuestas
interesantes, [StackOverflow](http://stackoverflow.com/) es un recurso
imprescindible. Recuerda que tu karma aumentará también cuando contestes
preguntas.

## Agradecimientos

Agradezco a los lectores en [Twitter](http://twitter.com/),
especialmente a [`@danielribes`](http://twitter.com/danielribes),
sugerencias sobre este material.

## Bibliografía

Como recursos adicionales, [las páginas de JavaScript en
Mozilla.org](https://developer.mozilla.org/en/About_JavaScript), el
[estándar
completo](http://www.ecma-international.org/publications/standards/Ecma-262.htm),
[Eloquent JavaScript](http://eloquentjavascript.net/) y el [curso de
JavaScript de Víctor Rivas
Santos](http://geneura.ugr.es/%7Evictor/cursillos/javascript/js_intro.html).

Por último, [JavaScript: The good
parts](https://www.amazon.co.uk/dp/0596517742?tag=severawebsite-21&camp=2902&creative=19466&linkCode=as4&creativeASIN=0596517742&adid=0MJ7MPPRP9H7PJ2B5MPB&)
es un manual bastante completo que menciona muchos trucos para trabajar
con este lenguaje.

Específicamente de node.js, se puede empezar por [esta pregunta en
StackOverflow](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js),
para seguir con [el sitio de node.js](http://www.nodehispano.com/) en
español, que incluye enlaces a
[nodebeginner](http://www.nodebeginner.org/index-es.html), el libro para
principiantes en node.js. La traducción tiene algunos errores, pero es
legible. Finalmente, [Opsou nos ofrece una lista de tutoriales en
español](http://www.opsou.com/blog/recopilacion-de-tutoriales-sobre-node-js-en-castellano/).
Finalmente, también hay [una cuenta de Twitter (no demasiado
activa)](https://twitter.com/nodejs_es). También el libro inserto (o
cualquier otro recomendado, a esta alturas hay una cantidad ingente de
bibliografía sobre node.js).
