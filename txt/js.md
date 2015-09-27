Introducción al lenguaje de programación JavaScript
===================================================

JavaScript en el navegador y JQuery {name="jquery"}
-----------------------------------

-   Trabajar con JavaScript en el navegador
-   Usar librerías populares de JavaScript en ese contexto

### El modelo de objetos

Ya no es tan difícil encontrar un enfoque como el de este curso,
centrado en JS como lenguaje y no como un chisme más dentro del
navegador. Eventualmente, habrá que tratar con esto, así que este
momento es tan bueno como cualquier otro. En realidad, la mayor
diferencia entre JS-sin-navegador y JS-con-navegador es el bagaje de
objetos con el que tiene que trabajar y también el modelo que se va a
usar para entrada y salida: la propia *página* en la que está inserto el
programa.

En general, lo que hace un navegador es analizar el HTML que le envía el
servidor y convertirlo en un árbol, el
[DOM](http://es.wikipedia.org/wiki/DOM) o *document object model*. Todo
lo que hay en el documento es una hoja o un nudo dentro de ese árbol. Lo
importante es que los programas JS, aparte de ser hojas dentro de ese
árbol, también actúan sobre ese árbol, añadiendo o quitando hojas, o
simplemente alterando sus propiedades. El DOM está definido como un
[estándar del W3](http://www.w3.org/DOM/), pero eso no quita que haya
problemas de compatibilidad entre los diferentes navegadores. Por
ejemplo,
[Mozilla](https://developer.mozilla.org/en/docs/Gecko_DOM_Reference)
tiene su modelo de objetos, que usa en sus navegadores, los más bonitos
del mundo mundial.

Para empezar, vamos a ver qué pinta tiene el DOM de un documento
cualquiera. Por ejemplo, usemos esta misma página, que para eso está ya
en HTML. En Firefox, se ve el DOM completo con la combinación de teclas
Ctrl+Shift+I. Para ésta página, saldría algo así: ![DOM de una
página](imagenes/AAP-DOM.png) La estructura es la que cabe esperar: hay
un nodo raíz, etiquetado como `document`, del que descienden las dos
partes del documento HTML: `HEAD` y `BODY`. Y de ahí, pues el resto.

Todos las herramientas relacionadas con la página web, como el CSS,
trabajan y tienen en cuenta esta estructura DOM del documento. Y cuando
un programa JS se ejecuta dentro de un documento, puede alterar su
estructura. Veámoslo, por ejemplo, en el
[`docwrite.html`](https://github.com/JJ/curso-js/blob/master/code/docwrite.html):

`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"> <html>   <head>     <title>Prueba document.write</title> <script type='application/javascript'>       function setColor( color ) {       document.getElementById('color').style.background =color;       } </script>   </head>    <body>     <h1>Prueba document.write</h1>  <p><input type='text' name='color' value='Color (in inglis)' onChange='setColor(value)' /></p>  <div id='color'>&nbsp;&nbsp;</div>     <hr>     <address><a href="mailto:jmerelo@localhost.localdomain">Juan J. Merelo</a></address> <!-- Created: Wed Feb 21 18:45:35 CET 2007 --> <!-- hhmts start --> Last modified: Sun Feb 25 18:57:52 CET 2007 <!-- hhmts end -->   </body> </html> `{.ejemplo}

que crearía un DOM con el aspecto siguiente: ![Creación de un nodo en el
DOM con JS](imagenes/nuevonodo.png) Como se ve, el nodo `P` sigue al
nodo `script`, es decir, que el nodo se crea en el DOM justamente
siguiendo al nodo que incluye el script. En realidad, se crean tantos
nodos como a uno le interese, pero de esta forma sólo se pueden colocar
en el sitio donde está el script. Así que habrá que imaginar otra forma
de hacerlo.

Navegar por el modelo de objetos no es excesivamente complicado, gracias
a las funciones `getElementsBy*`, que escogen elementos del DOM de
acuerdo con alguna característica. `getElementsByTagName` escoge
elementos por el nombre de la etiqueta, mientras que `getElementById`
usa el atributo `id`; nótese la diferencia entre `Elements` y `Element`;
en el primer caso se devuelve un `Array` y en el segundo uno solo,
porque la Id es única. Cuando se trabaja con un documento, habrá que
usar de forma sabia los atributos y clases de forma que sea fácil
escoger y trabajar con los elementos de un tipo determinado, o con un
elemento en concreto. Por ejemplo, `getElementByTagName('h2')` devolverá
un array con todos los elementos que tengan esa etiqueta, y
`getElementById('ej.t1.3')` devolverá el tercer bloque de ejercicios de
este tema, como veremos en el ejemplo siguiente (que está incluido en la
misma página):

`Bloque  `{.ejemplo}

 

`function putBloque(value) {       var ejs = document.getElementById('ej.T1.'+value);       document.getElementById('resultado1').innerHTML=ejs.textContent; }        `{.ejemplo}

Un par de líneas sólo de JS: una para buscar el elemento (la primera) y
la segunda para extraer su contenido (`textContent`) e introducirlo en
otro, el elemento `resultado1` que teníamos preparado al efecto.
`innerHTML` es el HTML interno de un elemento: al asignarle un valor,
efectivamente, sustituimos parte del contenido de la página
dinámicamente. ¿No es una maravilla?

### Usando GreaseMonkey

No se sabe porqué los temas de JS tienen tanta relación con los
primates, pero el hecho es que [GreaseMonkey](http://greasespot.com) (o
[TamperMonkey](http://tampermonkey.net/), su equivalente en Chrome,
Chromium y Opera Next, que tiene una *capa de compatibilidad* que
permite ejecutar estos scripts) es un *plugin* para los navegadores
[Mozilla](http://mozilla.org) que permite instalar en el navegador
programillas JS específicos de una página o grupo de páginas. Para
trabajar con él, lo primero que hay que hacer es instalarlo
(Herramientas-\>Complementos en Firefox y Herramientas-\>Extensiones en
Chrome y Chromium) y reiniciar el navegador.

Una vez hecho eso, Grease/TamperMonkey reconoce los scripts con la
extensión `.user.js` como propios (es decir, los abre cuando se
descargan desde una web o se abre el fichero), los instala, y permite
gestionarlos, activarlos, y desactivarlos, desde un icono con un monito
en la barra inferior del navegador. O sea, que una vez que se vea el
monito, podemos cargar [este programa
(`aap-nav.user.js`)](https://github.com/JJ/curso-js/blob/master/code/aap-nav.user.js)
que lo usa:

`// ==UserScript== // @name                AAP-Nav // @namespace           http://geneura.org/projects/greasemonkey // @description         Navegación por las secciones de AAP // @include             http://geneura.ugr.es/~jmerelo/asignaturas/* // ==/UserScript==  GM_log('Entrando AAP-Nav'); var h2 = document.getElementsByTagName('h2'); var a_nodes = new Array; var anchors = new Array; for ( var secs = 0; secs < h2.length; secs ++ ) {   var thisA = h2[secs].getElementsByTagName('a');   a_nodes[secs] = thisA[0];   anchors[secs] = thisA[0].getAttribute('name');   GM_log('Anchor ' + secs + " " + anchors[secs]); }    for ( var secs = 0; secs < h2.length; secs ++ ) {   var span = document.createElement('span');   span.setAttribute('style','background:lightblue');   if ( secs > 0 ) {     var ahref = document.createElement('a');     ahref.setAttribute('href','#'+anchors[secs-1]);     var txt=document.createTextNode('^');     ahref.appendChild(txt);     span.appendChild(ahref);   }   if ( secs < h2.length -1  ) {     span.appendChild(document.createTextNode(' | '));     var ahref = document.createElement('a');     ahref.setAttribute('href','#'+anchors[secs+1]);     var txt=document.createTextNode('v');     ahref.appendChild(txt);     span.appendChild(ahref);   }   a_nodes[secs].parentNode.insertBefore(span,a_nodes[secs]); }`{.ejemplo}

Este programa añade unas flechitas de navegación a una página que
incluya cabeceras `h2` de forma que se pueda pasar de cada sección a la
anterior a la siguiente (de ahí lo de aap-nav). Tiene dos partes: la
primera parte halla las etiquetas de navegación, y la segunda las
inserta. Tres partes, de hecho, si incluimos las declaraciones del
principio, que son para uso y disfrute del propio GreaseMonkey. Las dos
primeras son terminológicas: cómo se llama, y qué espacio de nombres
usa. Esto es para distinguir scripts con el mismo nombre de diferentes
fuentes. La tercera, una descripción, aparece en los directorios
correspondientes y cuando gestionamos los scripts.

El cuarto apartado es el más importante. Es un patrón de las páginas en
las que va a funcionar el script. Éste no tendría sentido fuera de las
páginas de la asignatura en la que estaban incluidos originalmente estos
apuntes, así que incluimos en el mismo simplemente a las que hay en ese
directorio. Cuando el navegador cargue alguna página con ese patrón, GM
lo detectará y cargará el script; para que trabaje sobre otro conjunto
de páginas habrá que poner el patrón correspondiente.

El programa en sí hace uso de los elementos explicados en la sección
anterior: extrae del documento los títulos de capítulo (h2) y de ahí los
*anchor* (`a name`) y sus atributos, metiendo todo lo metible en un
bucle. Hace falta tenerlos todos en un array, por eso se usa un segundo
bucle para insertar en la página los elementos de navegación.

Este segundo bucle crea elementos a tutiplén, usando `createElement`
(para crear un elemento), `setAttribute` (para poner su atributo) y
`createTextNode` (para meter texto dentro de los elementos). Luego, a
modo de injerto, se van metiendo los elementos unos dentro de otros
usando `appendChild`. Y, finalmente, se insertan los elementos creados
en el documento en la penúltima línea:

a\_nodes[secs].parentNode.insertBefore(span,a\_nodes[secs]);

que navega desde el *ancla* hasta su padre (`parentNode`) e inserta
antes del mismo (`insertBefore`) el `span` que hemos creado previamente.
El resultado, si todo ha ido bien, deberías verlo en este mismo
tutorial.

Además, hace uso de algunas funciones propias de GM: `GM_log`, que
escribe en la consola de JavaScript. Muy útil para depurarlo, inútil en
producción; pero si abres la consola de JS verás los mensajes que ha
usado.

Para usarlo con TamperMonkey, hay que marcar [las opciones de
compatibilidad con GreaseMonkey y
Firefox](http://tampermonkey.net/#features), aunque también trata de
detectar las opciones necesarias automáticamente.

### Trabajando con otras ventanas

Una de las características específicas del DOM es la posibilidad de
trabajar con otras ventanas, creando contenido y presentándolo en las
mismas. Para eso se usa el objeto `window`; lo interesante de este
elemento eso que está incluido en el propio DOM, por lo que se puede
usar desde JavaScript como hacemos en el siguiente programa. No es que
sea aconsejable, por cierto; debe usarse sólo en caso de que sea
imprescindible (a veces se usa para autenticación, por ejemplo, o para
no crear elementos nuevos en el interfaz). Por ejemplo, se hace así en
[este
programa](https://github.com/JJ/curso-js/blob/master/code/windowopen.html)

`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-15"> <title>Probando window.open</title> <script type='application/javascript'> var contenido = "<html><head><title>Mi ventanita</title></head><body><h1>Mi ventanita</h1></body></html"; newwindow=window.open(); newdocument=newwindow.document; newdocument.write(contenido); </script>`{.ejemplo}

En este caso, se crea una nueva página estática usando `write` sobre el
documento que hemos creado. No es que sea demasiado útil (se podría usar
el URL directamente pasándoselo como parámetro a `open`) pero demuestra
las posibilidades del mismo, que también se pueden ver en [este
mini-tutorial](http://www.htmlgoodies.com/beyond/javascript/javascript-dynamic-document-creation-in-new-windows.html).

### Selectores

Las hojas de estilo [CSS](http://es.wikipedia.org/wiki/CSS) son una
especificación de la apariencia de elementos tanto HTML como XML que
permiten asignar parámetros de presentación específico a cada elemento o
a grupos de ellos. No es el objetivo de este manual enseñarlas, pero su
utilidad va más allá de la mera apariencia, permitiendo designar (usando
IDs) y agrupar (usando *clases*) elementos o grupos de los mismos.
Cuando hemos hablado anteriormente de seleccionar un solo elemento por
la id, estamos usando un tipo de selector básico; sin embargo, si
queremos trabajar con selectores más generales (como haremos más
adelante) es conveniente que se aprenda la sintaxis de CSS que es la que
se usa de forma más general.

La [sintaxis más general está especificada por la
W3](http://www.w3.org/TR/CSS2/selector.html) y se puede observar en
cualquier hoja de estilo. De esta, extraemos [los 30 selectores que se
deben
memorizar](http://net.tutsplus.com/tutorials/html-css-techniques/the-30-css-selectors-you-must-memorize/),
principalmente `#` que se refiere a un id específico (por ejemplo,
`#ej.1.1` seleccionaría un div declarado como `div id='ej1.1.1'` y `.`
que se refiere a una clase; `.ej` por ejemplo seleccionaría todos los
div declarados así: `div class='ej'`.

### Eventos

Para entender bien el uso de JavaScript en el navegador es conveniente
introducir el concepto de eventos. Se trata simplemente de señales
generadas por el mismo, o bien registradas por el usuario (es decir,
introducidas por el usuario cuando suceda algo determinado). El
navegador, por ejemplo, genera un evento cuando el ratón entra o sale de
un elemento, cuando se carga la página, o cuando se pulsa el ratón sobre
un elemento activo. He [la lista de todos los eventos y de los elementos
a los que
afectan](http://www.koderguru.com/tutorials/javascript/javascriptevents.php).
Los eventos permiten por un lado trabajar con un patrón de programación
reactiva, en la que se reacciona a lo que va sucediendo en el navegador
y, a la vez, un cierto grado de concurrencia porque cada evento sucede
en una hebra diferente. También se trabaja de forma asíncrona, porque en
muchos casos no se llevarán a cabo de forma secuencial sino cuando se
cumplan ciertas condiciones.

La forma más simple de trabajar con eventos es usar los atributos de un
elemento HTML para activarlos, como [aquí mismo](#). El atributo
`onClick` tiene como valor directamente una llamada a una función en JS
que se activa cuando se pulsa el botón sobre este tipo de elemento.

Hay [una docena de eventos](http://101.lv/learn/JSweek/ch5.htm), pero no
todos se usan con la misma asiduidad. Uno que se usa habitualmente es el
evento `load`, que ejecuta algo sólo cuando se ha cargado la página
completa. El comienzo de ejecución de cualquier elemento de JS conviene,
como buena práctica, que se haga tras el evento onLoad, porque si no se
ha terminado de cargar puede que el DOM no esté completo o que no lo
estén las definiciones de algunos elementos que el programa JS pueda
necesitar. El evento `load` sólo se activa desde el elemento `body`,
como en [este
ejemplo](https://github.com/JJ/curso-js/blob/master/code/onload.html)

`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-15"> <title>Probando onLoad</title> </head>  <body onLoad='alert("Ahora está todo cargado")'> <h1>Esta es una página que no tiene gran cosa</h1>  <p>Pero podría tenerla.</p>`{.ejemplo}

El uso de evento está hacia el final del código, donde usamos `alert`
que se activa tras el evento `load`, es decir, cuando se carga la página

### JQuery: Introducción [\#](#TJ:tj:jq)

[JQuery](http://jquery.com) es una librería en JavaScript que está
diseñada principalmente para simplificar la creación de programas y
permitir crear interfaces ricos de usuario.
[JQuery](http://es.wikipedia.org/wiki/JQuery) se ha popularizado desde
su creación en el año 2006 hasta el punto que se calcula que se usa en
más de la mitad de los sitios más populares. Por supuesto, es software
libre con una [licencia MIT](http://en.wikipedia.org/wiki/MIT_License).
Ha sido aceptada también e integrada por casi todas las grandes empresas
que crean herramientas de desarrollo de software e incluso Google aloja
directamente una copia de JQuery que se puede usar desde cualquier
programa.

A vista de pájaro, JQuery introduce un objeto, `$`, que permite acceder
a todas sus funciones. Podemos empezar con la función `ready` en el
[siguiente
programa](https://github.com/JJ/curso-js/blob/master/code/ready.html):

`<html> <head> <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-15"> <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> <title>Probando ready de jQuery</title> </head>  <body> <h1>Esta es una página que no tiene gran cosa</h1>  <p>Pero podría tenerla.</p> <script type='text/javascript'> $(document).ready(function() {     alert('Ahora estamos listos'); }); </script>`{.ejemplo}

En este caso, usamos como se ha indicado antes la copia de JQuery
proporcionada por Google, que, como cualquier otra librería JS, debe ser
incluida en nuestra página para ser usada. Por otro lado, la única
función que usamos de JQuery está tras el párrafo: cuando el documento
está *listo* (`ready`), lanzamos un `alert`. Este script funciona
exactamente igual que como el que habíamos visto anteriormente.

De hecho, se puede
[simplificar](https://github.com/JJ/curso-js/blob/master/code/ready-simple.html)
e incluso ahorrar la orden para pasar directamente a la función que
queremos que se active cuando se cargue la página.

JQuery también simplifica el uso de selectores para extraer elementos
del DOM, usando la misma sintaxis que hemos visto arriba:
`$("selector")` permite extraer una serie de elementos que cumplan esa
sintaxis que, como hemos visto más arriba, es la misma que se usa en las
CSS. Lo vemos en el [siguiente
ejemplo](https://github.com/JJ/curso-js/blob/master/code/selectores.html)

`<script type='text/javascript'> $(function() {     var hachedoses ='';     $("h2").each( function() {         hachedoses += this.textContent + " - ";     } );     alert(hachedoses);     $("#cambiando").html( hachedoses );  }); </script> <h2>Este es un H2</h2>  <h2>Este es otro H2</h2>  <H2>Y este, lo adivinaste, otro</H2>  <div id='cambiando' style='border:dashed'></div>`{.ejemplo}

En este ejemplo, primero se recorren los elementos `h2` pero en vez de
hacerse a partir de un bucle se usa directamente el objeto generado por
el selector y que aplica a cada uno de ellos una función anónima; en
este caso la función concatena a `hachedoses` el contenido en texto del
elemento. Usamos el `alert` principalmente para que se vea el contenido
del `div` definido más abajo vacío y posteriormente con el contenido que
se le añade en la última línea del script, que usa como selector el
equivalente a un elemento con el id `#cambiando`.

Introducción a node.js {name="nodejs"}
----------------------

-   Conocer node.js y saber sus conceptos fundamentales.
-   Aprender los conceptos básicos de los servicios web basados en
    [REST](#REST), la representación de datos usada y cómo
    implementarlos en node.js
-   Realizar prototipos rápidos de cliente y servidor de servicio web
    usando node.js

### Node.js, un intérprete asíncrono para JS

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
con `sudo apt-get     install nodejs`, desde los repositorios, o
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

`#!/usr/bin/node  var saludo = new Object; saludo.hola = 'mundo'; console.log( saludo );`{.ejemplo}

La primera línea es exclusivamente para sistemas Linux (que son, por
otro lado, los únicos serios para desarrollo de software); en ella habrá
que poner el camino completo al intérprete de node; este es una opción,
como `/usr/local/bin/node` u `/usr/bin/env node` en el caso de usar
`nave`; con ella y haciendo ejecutable el fichero con `chmod +x node.js`
podemos ejecutarlo y obtener el siguiente resultado

`jmerelo@penny:~/servicios-web/ejemplos$  ./guenas.js  { hola: 'mundo' }`{.ejemplo}

En otro entorno (o si no se quiere hacer al fichero ejecutable), con
escribir

`jmerelo@penny:~/servicios-web/ejemplos$  node guenas.js `{.ejemplo}

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

`console.log('Respuesta: %s', saludo.hola     )`{.ejemplo}

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

`#!/usr/local/bin/node  var fs = require('fs'); fs.readFile('quiniela.datos', 'utf8',          function(err,datos) {         if (err) {             return console.log(err);         };         var filas = datos.split("\n");         for ( var f in filas ) {             var cachos = filas[f].split(" ");             var partido = { 'local': cachos[0],                     'visitante': cachos[1],                     'resultado': cachos[2] };             console.log( partido );         }         });`{.ejemplo}

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

`{ local: 'Madrid', visitante: 'Barça', resultado: 'x' } { local: 'Atleti', visitante: 'Barça', resultado: '1' } { local: 'Athleti', visitante: 'Recre', resultado: '1' } { local: 'Depor', visitante: 'Athleti', resultado: '2' } { local: 'Elche', visitante: 'Hércules', resultado: 'x' } { local: 'Cai', visitante: 'Madrid', resultado: 'x' }   { local: 'Graná', visitante: 'Recre', resultado: '1' }`{.ejemplo}

Es decir, los datos leídos en formato JSON.

### `npm`, instalación de módulos en Node

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

`#!/usr/bin/node  var https = require('https');  var user =process.argv[2]?process.argv[2]:'JJ';  var options = {     host: 'api.github.com',     path: '/users/'+user,     method: 'GET' };  var req = https.get(options, function(res) {                res.setEncoding('utf8');                res.on('data', function (datos_JSON) {                       var datos=JSON.parse(datos_JSON);                       console.log('Login: ' + datos.login+ "\nNombre: " + datos.name + "\n");                   });                }); req.end();`{.ejemplo}

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

### Usando un servidor web

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

`#!/usr/bin/node  //cabecera console.log('Content-Type: text/plain; charset=UTF-8');  //contenido var una_variable=['uno','dos',{ tres: 'tres'}]; console.log(''); console.log(una_variable);`{.ejemplo}

Para ejecutarlo no hay más que copiarlo a un directorio determinado con
permisos de ejecución para otros (`chmod +x     hola-js.cgi`).La primera
envía una cabecera al cliente que le indica el tipo que se usa; la
segunda parte es la que efectivamente envía el contenido, en este caso
una variable en JSON (recordad que console.log escribe en salida
estándar, y convierte las estructuras de datos a JSON).

Node, por su naturaleza asíncrona, realmente no es el mejor sistema para
trabajar con JavaScript en un servidor que incluya otros lenguajes. Sin
embargo, se puede usar JavaScript de muchas maneras diferentes:
[SilkJS](http://www.silkjs.net/), por ejemplo, es un intérprete de JS
que incluye también un servidor web; o
[TeaJS](http://code.google.com/p/teajs/) es un sistema para crear
[CGIs](#CGI) basado en el intérprete rápido de JS de Google. Por no
introducir más herramientas, no los vamos a ver aquí, pero conviene
tener en cuenta que existen este tipo de soluciones que pueden convivir
en un servidor como Apache o NGINX con otros lenguajes como Ruby o Perl.

### node.js como servidor

Crear un servidor web con node.js es tan simple que viene directamente
en [la página principal del mismo](http://nodejs.org/)

`var http=require('http'); http.createServer(function (req, res) {   res.writeHead(200, {'Content-Type': 'text/plain'});   res.end('Ahí estamos\n'); }).listen(8080, '127.0.0.1'); console.log('Server running at http://127.0.0.1:8080/');`{.ejemplo}

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
[](https://github.com/JJ/curso-js/blob/master/code/servidor-var.js)
`var http=require('http');  http.createServer(function (req, res) {     res.writeHead(200, {'Content-Type': 'text/plain'});      res.end('Ahí estamos ' + req.url);  }).listen(8081, '127.0.0.1');  console.log('Servidor ejecutándose en http://127.0.0.1:8081/');`{.ejemplo}

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

`var http=require('http');  var puerto=process.argv[2]?process.argv[2]:8080; http.createServer(function (req, res) {      res.writeHead(200, {'Content-Type': 'text/plain'});      var split_url=req.url.split("/");      if ( split_url[1] == '' ) {      res.end('Portada');      } else if ( split_url[1] == 'proc' ) {      res.end('No es la portada');      } else {      res.end('No entiendo la petición');      }  }).listen(puerto, '127.0.0.1');  console.log('Server running at http://127.0.0.1:'+puerto+'/');`{.ejemplo}

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

### Para finalizar

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

### Agradecimientos

Agradezco a los lectores en [Twitter](http://twitter.com/),
especialmente [@danielribes](http://twitter.com/danielribes),
sugerencias sobre este material.

### Bibliografía

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

Trabajando con REST y AJAX
--------------------------

-   Aprender los conceptos generales de los interfaces REST.
-   Programar clientes y servidores para REST usando diferentes
    lenguajes de programación
-   Introducción a Ajax y otras técnicas cliente-servidor.

### Introducción al interfaz REST

[REST](http://es.wikipedia.org/wiki/REST) es una serie de convenciones
en la interacción cliente-servidor sobre el protocolo [HTTP](#HTTP). En
la práctica, un interfaz REST es un interfaz de programación de
aplicaciones que usa, para acceder al servidor, el conjunto completo de
órdenes del protocolo [HTTP](#HTTP) y confía en los mensajes
informativos y de error del mismo.

Aunque se trate de un *hermano menor* de otros tipos de servicios web
(que se verán más adelante en este curso), su popularidad se debe sobre
todo al poco overhead que añade a las peticiones y a la facilidad de su
uso, tanto en el cliente como el servidor. También se puede implementar
directamente sobre servidores web estándar como Apache o
[nginx](http://es.wikipedia.org/wiki/Nginx) , lo que facilita su
implantación y desarrollo. Crear un cliente para un [API](#API) REST es
tan fácil como crear una cadena; de hecho, se pueden usar desde la línea
de órdenes

### El protocolo HTTP y sus múltiples posibilidades

El protocolo [HTTP](http://es.wikipedia.org/wiki/HTTP) es uno de los
protocolos más infrautilizados de la historia. A pesar de que ofrece
múltiples posibilidades y versiones, se usa simplemente para enviar y
recibir información de un servidor. Para recibir información se usa la
orden `GET`, y para enviar, la orden `POST`. Pero también hay otras
posibilidades, `PUT` (que envía un recurso determinado al servidor),
`DELETE` (que borra un recurso del servidor) e incluso `HEAD` (igual que
`GET`, pero sin el cuerpo de la respuesta).

El protocolo [HTTP](#HTTP) gira alrededor del concepto de *recurso*: un
recurso en un servidor está identificado por un URI, y es la mínima
acción que un servidor puede realizar. Como características adicionales,
la acción de algunas peticiones (`GET` y `HEAD`) debe ser *segura*, es
decir, dejar al servidor en el mismo estado que antes de la petición.
Otras acciones, como `PUT` y `DELETE`, se denominan *idempotentes*: el
hacer varias veces la misma petición tiene el mismo efecto que el
hacerla una sola vez.

[HTTP](#HTTP) funciona puramente como cliente-servidor: se hace una
petición, y se espera la respuesta. Lo que no quiere decir que no se
puedan hacer peticiones concurrentes y asíncronas; sin embargo, esas
peticiones tendrán que estar dentro del marco de una página web (o sea,
una aplicación).

A las peticiones el servidor responde con una serie de [códigos
estándar](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes), que
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
características se suelen llamar [aplicaciones
RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer)
(REST == REpresentational State Transfer). La idea de REST es que se
transfiere el estado del servidor al cliente. Un recurso tiene una
representación, que se transfiere al cliente por una petición; esa
representación se puede cambiar con diferentes operaciones. Sin embargo,
con esto sólo estamos especificando la capa más baja del servicio web;
hace falta una capa de mensajería. Y esta capa de mensajería se suele
denominar [POX](http://es.wikipedia.org/wiki/POX), o *Plain Old XML*
(XML *de toda la vida*), es decir XML bien formado con algunas
ampliaciones, pero sin ningún tipo de validación. En algunos casos se
usa texto directamente, aunque también se puede usar JSON o cualquier
otro tipo de capa.

De hecho, las aplicaciones [REST suelen ser más
populares](http://www.oreillynet.com/pub/wlg/3005) que otros servicios
web, por el simple hecho de que es muy fácil construir el interfaz:
simplemente creando una cadena determinada. Eso los hace también más
rápidos, aunque sean menos flexibles.

Vamos a ver un interfaz de este tipo relativamente reciente: el de
[Twitter](http://twitter.com/), un sitio *social* que transmite a todo
el que quiera escucharlo las líneas de estado (mensajes de menos de 200
caracteres). El [API de Twitter](https://dev.twitter.com/docs) es
[RESTful](#RESTful), y está bastante bien diseñada. Para usarla es
necesario darse de alta; desde la versión 1.1 del interfaz todas las
peticiones necesitan autenticación. Así que usaremos [otro interfaz, el
de GitHub](http://developer.github.com/v3/), para hacer pruebas. Por
ejemplo, esta petición te dará todas las *organizaciones* a las que
pertenece el usuario [JJ](http://github.com/JJ):

`bash$ curl -i https://api.github.com/users/JJ/orgs`{.ejemplo}

Para llevar a cabo este ejemplo hay que instalar `curl`, un programa que
en una primera aproximación es simplemente un descargador de páginas web
pero que en segunda se puede usar como un completo cliente
[REST](#REST); en este caso `-i` te incluye las cabeceras en la salida,
con lo que producirá algo de este estilo

`HTTP/1.1 200 OK Server: GitHub.com Date: Fri, 25 Oct 2013 16:58:26 GMT Content-Type: application/json; charset=utf-8 Status: 200 OK X-RateLimit-Limit: 60 X-RateLimit-Remaining: 57 X-RateLimit-Reset: 1382723596 Cache-Control: public, max-age=60, s-maxage=60 ETag: "86e56765000470d5120c565f2d669ec5" Vary: Accept X-GitHub-Media-Type: github.beta X-Content-Type-Options: nosniff Content-Length: 1050 Access-Control-Allow-Credentials: true Access-Control-Expose-Headers: ETag, Link, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes Access-Control-Allow-Origin: * X-GitHub-Request-Id: 533BCE5D:1FA3:25A831A1:526AA332 Vary: Accept-Encoding  [   {     "login": "openkratio",     "id": 2310256,     "url": "https://api.github.com/orgs/openkratio",     "repos_url": "https://api.github.com/orgs/openkratio/repos",     "events_url": "https://api.github.com/orgs/openkratio/events",     "members_url": "https://api.github.com/orgs/openkratio/members{/member}",     "public_members_url": "https://api.github.com/orgs/openkratio/public_members{/member}",     "avatar_url": "https://1.gravatar.com/avatar/da65290f54a587ec04cd35bb85d072ad?d=https%3A%2F%2Fidenticons.github.com%2F95a0686b2cd65a0d12a9cdf6ee9001ca.png&r=x"   },   {     "login": "CANUBE",     "id": 3839808,     "url": "https://api.github.com/orgs/CANUBE",     "repos_url": "https://api.github.com/orgs/CANUBE/repos",     "events_url": "https://api.github.com/orgs/CANUBE/events",     "members_url": "https://api.github.com/orgs/CANUBE/members{/member}",     "public_members_url": "https://api.github.com/orgs/CANUBE/public_members{/member}",     "avatar_url": "https://identicons.github.com/6fb6b5f6fdd67839b9ff438ffa975d08.png"   }   ]`{.ejemplo}

Casi todos los servicios web incluyen alguna forma de autenticación; una
de las formas de hacerlo es incluirlo en el propio URL, en la forma
habitual: `usuario:clave@host`; en este caso no es necesario y en la
mayoría de los [API](#API) REST se usa ya autenticación OAuth en alguna
de sus formas.

Y lo único que hacemos con la respuesta es imprimirla, tal cual, pero lo
mejor sería extraer información útil de la misma, como ocurre en [este
programa en
node.js](https://github.com/JJ/curso-js/blob/13e25e97315e58a84f268349ba61b650e7a097e3/code/github-get.js):

`#!/usr/bin/node  var https = require('https');  var user =process.argv[2]?process.argv[2]:'JJ';  var options = {     host: 'api.github.com',     path: '/users/'+user,     method: 'GET' };   var req = https.request(options, function(res) {                res.setEncoding('utf8');                res.on('data', function (datos_JSON) {                       var datos=JSON.parse(datos_JSON);                       console.log('Login: ' + datos.login+ "\nNombre: " + datos.name + "\n");                   });                }); req.end();`{.ejemplo}

Este programa descarga información de un usuario en JSON y la procesa.
Toma el usuario que se pase por la línea de órdenes, o bien usa `JJ` por
defecto, dando un resultado así

`jmerelo@penny:~/txt/docencia/cursos/JavaScript$  node code/github-get.js  Login: JJ Nombre: Juan Julián Merelo Guervós`{.ejemplo}

El programa hace una petición GET al [API](#API) de GitHub y del objeto
en JSON devuelto extrae (tras su conversión en un objeto JS con
`JSON.parse` un par de variables del mismo y las imprime. El objeto
contiene muchas más cosas que no nos interesan. El [módulo
`https`](http://nodejs.org/api/https.html#https_https_request_options_callback)
usado es muy similar al `http`, salvo por el protocolo usado. La
petición que se está usando es la forma más general, pero se puede usar
directamente `get` [de esta
forma](https://github.com/JJ/curso-js/blob/master/code/github-get.js):
`var   req = https.get('https://api.github.com/users/'+user,     function(res) `
con exactamente el mismo resultado.

La idea de [REST](#REST) desde el punto de vista del servidor es usar el
URL para representar recursos, y las propias órdenes de HTTP para
ejercitar acciones sobre ese recursos. En general, `GET` servirá para
transferir la representación de un recurso del cliente al servidor,
`POST` cambiará el estado de un recurso, `PUT` (que no se suele usar tan
a menudo) directamente cambiaría la representación del recurso, mientras
que `DELETE` borraría el recurso; a estas arquitecturas se les suele
denominar también *arquitecturas orientadas al recurso*

Por eso también se suelen proponer una serie de [buenas prácticas para
diseñar un interfaz
REST](http://en.wikipedia.org/wiki/Representational_State_Transfer#Guiding_principles_of_the_interface):

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
    `http://jost.com/quiniela/jornada/[número de       jornada]`
-   Un partido de una quiniela:
    `http://jost.com/quiniela/jornada/[número de       jornada]/partido/[número de partido]`
-   Para los resultados, habría que sustituir `quiniela` por
    `resultados`. Adicionalmente, añadir `usuario/[nombre de usuario]`,
    para recuperar los resultados propuestos por un usuario determinado.
    Por ejemplo, Resultados:
    `http://jost.com/resultados/jornada/22/usuario/foobar`

Las operaciones HTTP que se van a usar vienen determinadas por el diseño
del interfaz. Por ejemplo, para proponer un resultado determinado habría
que hacer una petición POST con dos parámetros: el nombre de usuario y
el resultado propuesto. El servidor responderá con un mensaje estándar
HTTP y un fichero XML si se ha podido hacer correctamente, y con un
error HTTP si no.

El principal problema con este diseño [RESTful](#RESTful) es hacerlo en
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
siguiente (dentro del fichero `httpd.conf` o el fichero de configuración
de un directorio en particular, `.htaccess`:

RewriteRule \^quiniela/(\\w+)/(\\d+)/(\\w+)/(\\d+)\$
/\~jmerelo/REST/quiniela.cgi?\$1=\$2&\$3=\$4 [L]

Parece un poco complicada, pero no lo es. Para empezar, se cambiará la
expresión regular de la izquierda por la de la derecha. La de la
izquierda incluye palabras (\\w+) y números (\\d+), y en la expresión de
la derecha aparecen, por orden, representados por `$n`.

El hecho de que sea tan complicado diseñar interfaces REST con recursos,
como los [CGIs](#CGI), que no están preparados para ello hace que
existan marcos de aplicaciones, como los que veremos a continuación, en
los que todo esto se hace de una forma mucho más simple, trabajando
directamente con las rutas REST.

### Interfaces REST simples con express

Para diseñar interfaces REST de forma bastante simple, hay un [módulo de
node.js llamado express](http://expressjs.com/). La idea de este módulo
es reflejar en el código, de la forma más natural posible, el diseño del
interfaz REST.

Pero primero hay que instalarlo. Node.js tiene un sistema de gestión de
módulos bastante simple llamado [npm](http://npmjs.org/) que [hemos
visto en el tema anterior](#nodejs). Tras seguir las instrucciones en el
sitio para instalarlo (o, en el caso de ubuntu, instalarlo desde
Synaptic o con apt-get), vamos al directorio en el que vayamos a crear
el programa y escribimos

`npm install express`

en general, no hace falta tener permiso de administrador, sólo el
necesario para crear, leer y ejecutar ficheros en el directorio en el
que se esté trabajando

Tras la instalación, el programa que hemos visto más arriba se
transforma en el siguiente:

`var express=require('express'); var app = express();  app.get('/', function (req, res) {        res.send('Portada'); });  app.get('/proc', function (req, res) {        res.send('No es la portada'); });  app.listen(8080); console.log('Server running at http://127.0.0.1:8080/');`{.ejemplo}

Para empezar, `express` nos evita todas las molestias de tener que
procesar nosotros la línea de órdenes: directamente escribimos una
función para cada respuesta que queramos tener, lo que facilita mucho la
programación. Las órdenes reflejan directamente las órdenes de
[HTTP](#HTTP) a las que queremos responder, en este caso `get` y por
otro lado se pone directamente la función para cada una de ellas. Dentro
de cada función de respuesta podemos procesar las órdenes que queramos.

Por otro lado, se usa `send` en vez de `end` para enviar el resultado.
Lo que viene a ser lo mismo, `s` más o menos, aunque [send es más
flexible](http://expressjs.com/guide.html#http-methods), admitiendo todo
tipo de datos que son procesados para enviar al cliente la respuesta
correcta. Tampoco hace falta establecer explícitamente el tipo MIME que
se devuelve, encargándose `send` del mismo.

Con el mismo `express` se pueden generar aplicaciones no tan básicas
ejecutándolo de la forma siguiente:

`node_modules/express/bin/express prueba-rest`{.ejemplo}

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
podríamos usar el [programa
siguiente](https://github.com/JJ/curso-js/blob/master/code/express-count.js):

`var express=require('express'); var app = express(); var contadores = new Array; var puerto=process.argv[2]?process.argv[2]:8080;  app.get('/', function (req, res) {        res.send('Portada'); });  app.put('/contador/:id', function( req,res ) {     contadores[req.params.id] = 0;     res.send( { creado: req.params.id } ); });  app.get('/contador/:id', function (req, res) {        res.send( "{ "+req.params.id+": "+ contadores[req.params.id] + "}"  ); });  app.post('/contador/:id', function (req, res) {        contadores[req.params.id]++;     res.send( "{ "+req.params.id+": "+ contadores[req.params.id] + "}"  ); });  app.listen(puerto); console.log('Server running at http://127.0.0.1:'+puerto+'/');`{.ejemplo}

Este [programa
(express-count.js)](https://github.com/JJ/curso-js/tree/master/code/express-count.js%27)
introduce otras dos órdenes REST: PUT, que, como recordamos, sirve para
crear nuevos recurso y es idempotente (se puede usar varias veces con el
mismo resultado), y además POST. Esa orden la vamos a usar para crear
contadores a los que posteriormente accederemos con get. PUT no es una
orden a la que se pueda acceder desde el navegador, así que para usarla
necesitaremos hacer algo así desde la línea de órdenes:
`curl -X PUT http://127.0.0.1:8080/contador/primero` para lo que
previamente habrá que haber instalado `curl`, claro. Esta orden llama a
PUT sobre el programa, y crea un contador que se llama `primero`. Una
vez creado, podemos acceder a él desde la línea de órdenes o desde el
navegador (desde el navegador se generan peticiones GET y POST
solamente).

### Clientes REST

Tampoco es complicado escribir con node.js un cliente REST. Se puede
hacer mediante peticiones HTTP, pero por supuesto es más fácil escribir
un cliente usando la librería
[restler](https://github.com/danwrong/restler), que se instala de la
misma forma que hemos visto anteriormente con `npm`. Una vez instalada,
se puede escribir un cliente como este al utilísimo crea-contadores
anterior.

`#!/usr/local/bin/node  var rest = require('restler'); var url = 'http://127.0.0.1:8080/contador/'; process.argv.forEach(function (val, index, array) {     if ( index > 1 ) {     rest.put( url + val ).on('complete', function( data ) {         console.log( data );     } );     } });`{.ejemplo}

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

### Usando Ajax

Aunque inicialmente [AJAX](http://es.wikipedia.org/wiki/AJAX) era un
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
interacción). En la práctica, el AJAX se basa en una clase de
JavaScript, `XMLHttpRequest`, que hace una petición al servidor, y crea
un evento que se dispara en el navegador cuando se produce la respuesta.
Puede haber varias peticiones de este estilo funcionando
simultáneamente, de forma que el navegador se comporta, en realidad,
como si se tratara de un interfaz de usuario.

Un programa AJAX, por tanto, tiene dos partes. La parte servidor se
suele programar habitualmente para que responda a un interfaz REST, pero
esto es simplemente una convención. Podíamos, por ejemplo, usar los
programas que hemos visto anteriormente

En cuanto al cliente, hay que tener en cuenta que únicamente se pueden
hacer peticiones al mismo dominio desde el que se ha descargado la
página en la que se haya inserto. Es decir, sólo puedes hacer peticiones
a `dominio.com` desde páginas que te hayas descargado desde
`dominio.com`. Por eso es importante que el sistema que tenga el
[API](#API) REST sea capaz también de servir las páginas; es lo que
vamos a hacer en el siguiente ejemplo. Necesitaremos tres ficheros para
ejecutar el programa. El primero es el [servidor en
node.js](https://github.com/JJ/curso-js/tree/master/code/count-server.js):
`var fs = require('fs'); var express=require('express'); var app = express(); var contadores = new Array; var portada = fs.readFileSync('sumar_formulario.html','utf8');  app.get('/', function (req, res) {      res.send(portada); });  app.get('/js/:page', function (req, res) {      var js = fs.readFileSync(req.params.page);     res.contentType('text/javascript');     res.send(js); });  app.put('/contador/:id', function( req,res ) {     contadores[req.params.id] = 0;     res.send('Creado contador '+ req.params.id ); });  app.post('/contador/:id', function (req, res) {        contadores[req.params.id]++;     res.contentType('application/json');     res.send( { resultado:  contadores[req.params.id] } );     console.log( { 'Post':  contadores} ); });  app.get('/contador/:id', function (req, res) {        res.contentType('application/json');     res.send( "{ 'resultado': " + contadores[req.params.id] + "}\n" ); });   app.get('/suma/:id1/:id2', function (req, res) {        res.send( { resultado: contadores[req.params.id1] +  contadores[req.params.id2]} ); });  app.listen(8080); console.log('Server running at http://127.0.0.1:8080/');`{.ejemplo}

Este código es similar al que hemos usado anteriormente, salvo que
respondemos a más comandos REST: GET, PUT y POST. PUT crea el contador,
POST lo incrementa y finalmente GET obtiene el resultado; recordemos que
GET debe ser idempotente y dejar al servidor en el mismo estado. Estos
dos últimos, además, devuelven el resultado en JSON, y no en texto. Lo
normal sería que entendieran varios formatos (incluyendo texto y HTML),
pero por lo pronto lo dejaremos así.

También hay que tener en cuenta que este servidor tiene que servir
*todos* los ficheros, no sólo el [API](#API) REST. Por eso se ha creado
otro seudo-comando que lee un fichero y lo sirve como JS. Ojo, este tipo
de órdenes son un potencial hueco de seguridad. Lo dejamos así por
simplicidad, no porque sea la forma adecuada que debería tener una
aplicación en producción.

La [página
web](https://github.com/JJ/curso-js/tree/master/code/sumar_formulario.html)
incluye lo mínimo necesario: el script JS incluido y un formulario para
solicitar el nombre del contador que se va a incrementar. El URL del
formulario incluye el "camino" ficticio al que responderá el servidor
REST, que incluye `js`. Ese fichero, precisamente, es el que vemos aquí:

`function cuenta() {   request = new XMLHttpRequest();   var contador=document.getElementById('contador').value;   var peticion_str = '/contador/'+contador;   request.open('POST', peticion_str , true);   request.onreadystatechange= escribe_resultado ;   request.send(null); }  function escribe_resultado(){   if ( request.readyState == 4 ) {     if ( request.status == 200 ) {     var json;     eval ( 'json = '+ request.responseText );     console.log(json);     document.getElementById('Resultado').innerHTML= 'Resultado = '+          json.resultado     }   } }`{.ejemplo}

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

En realidad, es mucho más fácil hacerlo con JQuery. En [esta web de
Codeko](http://codeko.com/docs/oslgr/intro_jquery/ajax2.php) muestran
como funcionan las órdenes básicas. El [formulario sería bastante
similar](https://github.com/JJ/curso-js/tree/master/code/formulario-jquery.html),
aunque hemos tenido que [modificar el servidor para que muestre
diferentes páginas
principales](https://github.com/JJ/curso-js/tree/master/code/count-server-var.js).
El principal cambio será, obviamente, en el código usado para la
solicitud Ajax, que usará jQuery en vez de JS puro. [Helo
aquí](https://github.com/JJ/curso-js/tree/master/code/cuenta-jquery.js):

`$(document).ready(function() {     $("#formulario").change(function(){         $.get('/contador/'+$('#contador').val(), function( data) {               $('#Resultado').html('Resultado '+ data.resultado);               });     });     } ); `{.ejemplo}

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

### Más allá del Ajax

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
[socket.io](http://socket.io/#how-to-use), que proporcionan todas las
facilidades de WebSocket mediante la conexión que esté disponible en el
navegador.

Un ejemplo de como usar estas librerías está en [este
tutorial](http://project70.com/nodejs/node-js-comet-real-time-chat-a-great-first-project/)
que muestra como llevar a cabo un chat en tiempo real usando node.js.

### A dónde ir desde aquí

Se puede ir a [aprender el uso de un sistema de almacenamiento de
objetos llamado
CouchDB](http://geneura.ugr.es/%7Ejmerelo/asignaturas/AAP/AAP-CouchDB.mhtml),
pero el tema de diseño de sistemas con node.js y JQuery en el cliente
puede ir mucho más allá, usando, por ejemplo [marcos MVC para node.js
como Sails.js](http://sailsjs.org) o [cualquier otro de los
recomendados.](http://stackoverflow.com/questions/9744798/which-nodejs-mvc-framework-currently-has-the-best-mix-of-maturity-and-ease-of-us)

jQuery también admite todo tipo de plugins, y muchos de ellos se pueden
usar con [formularios](http://malsup.com/jquery/form/) haciendo su
procesamiento mucho más rápido. Siempre hay una forma más simple de
hacer las cosas y posiblemente hay software libre para solucionarlo.

### Bibliografía y enlaces

En general, REST se considera, de forma amplia, dentro de los servicios
Web, por eso los libros que trabajan con él, en general, también
incluyen capítulos que tratan con REST. Sin embargo, si quieres usar un
lenguaje de programación determinado, te puede venir bien [Programming
Web Services with Perl, de Ray y
Kuchenko](http://www.amazon.com/gp/product/0596002068?ie=UTF8&tag=perltutobyjjmere&link_code=as3&camp=211189&creative=373489&creativeASIN=0596002068).
Es quizás un poco más prolijo en el apartado XML de la cuenta, y está un
tanto atrasado, pero vienen todos los módulos de Perl bien detallados y
explicados. El [RESTful Web Services
Cookbook](https://www.amazon.es/dp/B0043D2ESQ/ref=as_li_ss_til?tag=atalaya-21&camp=3634&creative=24822&linkCode=as4&creativeASIN=B0043D2ESQ&adid=1V5KDS1RVBZAE2W5B2PR&)
también es bastante útil en este sentido.

Glosario
--------

### API {name="API"}

*Application programming interface*, conjunto de órdenes que se usan
para interactuar con una aplicación a través de la llamada a una serie
de funciones. En un interfaz [RESTful'](#RESTful) las llamadas a
funciones son URLs a las que se les puede pasar, de forma adicional,
parámetros en forma de estructuras de datos codificadas, generalmente,
en JSON o XML y que se recibirán por entrada estándar al modo
[CGI](#CGI).

### CGI {name="CGI"}

En el contexto de la web, [CGI](http://www.w3.org/CGI/) significa
*Common Gateway Interface*, o interfaz de enlace común; es un método
para ejecutar programas desde un servidor web que consiste en codificar
las entradas al programa en entrada estándar (como si los leyera desde
teclado) y en variables de entorno (como si desde la línea de comandos
definiéramos una serie de variables) y entregar la salida por entrada
estándar. El servidor web ejecuta el programa, definiendo variables de
entorno y proporcionándole la entrada, y recibe la salida que envía al
quien ha solicitado el URL.

### HTTP {name="HTTP"}

[HTTP o Hypertext Transfer Protocol, protocolo de transferencia
hipertexto](http://es.wikipedia.org/wiki/Http), es el protocolo usado en
toda la web y que rige la forma como se solicitan recursos a un servidor
web, cómo se sirven y cómo se indican errores sucedidos en el mismo.
Durante mucho tiempo, el servidor web por excelencia ha sido
[Apache](http://httpd.apache.org), pero hoy en día es muy habitual la
creación de aplicaciones en torno a servidores HTTP integrados, como en
node.js o en entornos MVC como Django.

### PaaS {name="PaaS"}

[Platform as a Service, o Plataforma como
Servicio](http://es.wikipedia.org/wiki/PaaS#Plataforma_como_servicio),
es un producto que integra una máquina virtual provisionada con una
serie de aplicaciones de tal forma que sólo hay que subir el código que
usa esa aplicación. Básicamente se trata de usar servicios en la nube
sin necesidad de instalar y configurar los programas necesarios. Estos
PaaS pueden ir desde lo más básico, una simple base de datos, hasta
integrar pilas completas de servicios que permitan desplegar, por
ejemplo, una aplicación `node.js` o Django.

### REST {name="REST"}

[REST](http://es.wikipedia.org/wiki/Representational_State_Transfer)
significa transferencia de estado que representa algo (por no traducir
representacional, que suena fatal). Es una convención para el diseño de
[API](#API)s que consiste en usar los verbos del protocolo [HTTP](#HTTP)
y su significado estricto para llevar a cabo todas las operaciones de un
programa.

### RESTful {name="RESTful"}

[API](#API) diseñada siguiendo las convenciones [REST](#REST).

Licencia
--------

[![Licencia Creative
Commons](http://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)\
Introducción a JavaScript por [JJ Merelo](http://amzn.to/1gzEaMD) se
distribuye bajo una [Licencia Creative Commons Atribución-CompartirIgual
4.0 Internacional](http://creativecommons.org/licenses/by-sa/4.0/).\
Basada en una obra en
[http://github.com/JJ/curso-js](http://github.com/JJ/curso-js).
