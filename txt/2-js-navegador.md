#JavaScript en el navegador y JQuery 


##Objetivos de este capítulo

-   Trabajar con JavaScript en el navegador
-   Usar librerías populares de JavaScript en ese contexto

## El modelo de objetos del documento

> Las primeras versiones de este texto, en 2007, hacían énfasis en
> enseñar el lenguaje *fuera del navegador*. En aquél momento no era
> demasiado común. Sin embargo, ya no es tan difícil encontrar un enfoque como el de este curso,
> centrado en JS como lenguaje y no como un chisme más dentro del
> navegador. Eventualmente, habrá que tratar con esto, así que este
> momento es tan bueno como cualquier otro.

En realidad, la mayor
diferencia entre JS-sin-navegador y JS-con-navegador es el bagaje de
objetos con el que tiene que trabajar y el modelo que se va a
usar para entrada y salida: la propia *página* en la que está inserto el
programa.

En general, lo que hace un navegador es analizar el HTML que le envía el
servidor y convertirlo en un árbol, el
[DOM](https://es.wikipedia.org/wiki/DOM) o *document object model*. Todo
lo que hay en el documento es una hoja o un nudo dentro de ese árbol. Lo
importante es que los programas JS, aparte de ser hojas dentro de ese
árbol, también actúan sobre ese árbol, añadiendo o quitando hojas, o
simplemente alterando sus propiedades. El DOM está definido como un
[estándar del W3](http://www.w3.org/DOM/), pero eso no quita que haya
problemas de compatibilidad entre los diferentes navegadores. Por
ejemplo,
[Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
tiene su modelo de objetos, que usa en sus navegadores, los más bonitos
del mundo mundial.

Para empezar, vamos a ver qué pinta tiene el DOM de un documento
cualquiera. Por ejemplo, usemos esta misma página, que para eso está ya
en HTML. En Firefox, se ve el DOM completo con la combinación de teclas
`Ctrl+Shift+I`. Para ésta página, saldría algo así: ![DOM de una
página](imagenes/AAP-DOM.png) La estructura es la que cabe esperar: hay
un nodo raíz, etiquetado como `document`, del que descienden las dos
partes del documento HTML: `HEAD` y `BODY`. Y de ahí, pues el resto.

Todos las herramientas relacionadas con la página web, como el CSS,
trabajan y tienen en cuenta esta estructura DOM del documento. Y cuando
un programa JS se ejecuta dentro de un documento, puede alterar su
estructura. Veámoslo, por ejemplo, en el
[`docwrite.html`](https://github.com/JJ/curso-js/blob/master/code/docwrite.html):

~~~~~html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>Prueba document.write</title>
<script type='application/javascript'>
      function setColor( color ) {
      document.getElementById('color').style.background =color;
      }
</script>
  </head>

  <body>
    <h1>Prueba document.write</h1>

<p><input type='text' name='color' value='Color (in inglis)' onChange='setColor(value)' /></p>

<div id='color'>&nbsp;&nbsp;</div>

    <hr>
    <address><a href="mailto:jmerelo@localhost.localdomain">Juan J. Merelo</a></address>
<!-- Created: Wed Feb 21 18:45:35 CET 2007 -->
<!-- hhmts start -->
Last modified: Sun Feb 25 18:57:52 CET 2007
<!-- hhmts end -->
  </body>
</html>
~~~~~

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
este tema, como veremos en el ejemplo siguiente 

~~~~~javascript
function putBloque(value) {
	var ejs = document.getElementById('ej.T1.'+value);
	document.getElementById('resultado1').innerHTML=ejs.textContent;
}
~~~~~

Un par de líneas sólo de JS: una para buscar el elemento (la primera) y
la segunda para extraer su contenido (`textContent`) e introducirlo en
otro, el elemento `resultado1` que teníamos preparado al efecto.
`innerHTML` es el HTML interno de un elemento: al asignarle un valor,
efectivamente, sustituimos parte del contenido de la página
dinámicamente. ¿No es una maravilla?

## Usando GreaseMonkey

No se sabe porqué los temas de JS tienen tanta relación con los
primates, pero el hecho es que [GreaseMonkey](http://greasespot.com) es un *plugin* para los navegadores
[Mozilla](http://mozilla.org) que permite instalar en el navegador
programillas JS específicos de una página o grupo de páginas. Para
trabajar con él, lo primero que hay que hacer es instalarlo
(Herramientas-\>Complementos en Firefox) y reiniciar el navegador.

>[TamperMonkey](http://tampermonkey.net/) es su equivalente en Chrome,
Chromium y Opera Next. Este tiene una *capa de compatibilidad* que
permite ejecutar estos scripts, configurándolo y haciendo una serie de
transformaciones si es necesario. 

Una vez hecho eso, Grease/TamperMonkey reconoce los scripts con la
extensión `.user.js` como propios (es decir, los abre cuando se
descargan desde una web o se abre el fichero), los instala, y permite
gestionarlos, activarlos, y desactivarlos, desde un icono con un monito
en la barra inferior del navegador. O sea, que una vez que se vea el
monito, podemos cargar [este programa
(`aap-nav.user.js`)](https://github.com/JJ/curso-js/blob/master/code/aap-nav.user.js)
que lo usa:

~~~~~~javascript
// ==UserScript==
// @name                AAP-Nav
// @namespace           http://geneura.org/projects/greasemonkey
// @description         Navegación por las secciones de AAP
// @include             http://geneura.ugr.es/~jmerelo/asignaturas/*
// ==/UserScript==

GM_log('Entrando en AAP-Nav');
var h2 = document.getElementsByTagName('h2');
var a_nodes = new Array;
var anchors = new Array;
for ( var secs = 0; secs < h2.length; secs ++ ) {
  var thisA = h2[secs].getElementsByTagName('a');
  a_nodes[secs] = thisA[0];
  anchors[secs] = thisA[0].getAttribute('name');
  GM_log('Anchor ' + secs + " " + anchors[secs]);
}

for ( var secs = 0; secs < h2.length; secs ++ ) {
  var span = document.createElement('span');
  span.setAttribute('style','background:lightblue');
  if ( secs > 0 ) {
    var ahref = document.createElement('a');
    ahref.setAttribute('href','#'+anchors[secs-1]);
    var txt=document.createTextNode('^');
    ahref.appendChild(txt);
    span.appendChild(ahref);
  }
  if ( secs < h2.length -1  ) {
    span.appendChild(document.createTextNode(' | '));
    var ahref = document.createElement('a');
    ahref.setAttribute('href','#'+anchors[secs+1]);
    var txt=document.createTextNode('v');
    ahref.appendChild(txt);
    span.appendChild(ahref);
  }
  a_nodes[secs].parentNode.insertBefore(span,a_nodes[secs]);
}
~~~~~~

Este programa añade unas flechitas de navegación a una página que
incluya cabeceras `h2` de forma que se pueda pasar de cada sección a la
anterior a la siguiente (de ahí lo de `aap-nav`). Tiene dos partes: la
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

    a_nodes[secs].parentNode.insertBefore(span,a_nodes[secs]);

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

## Trabajando con otras ventanas

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

~~~~~HTML
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-15">
<title>Probando window.open</title>
<script type='application/javascript'>
var contenido = "<html><head><title>Mi ventanita</title></head><body><h1>Mi ventanita</h1></body></html";
newwindow=window.open();
newdocument=newwindow.document;
newdocument.write(contenido);
</script>
</head>
<body>
<h1>Esta es una página que abre otra ventana</h1>

<p>Desbloquea las ventanas emergentes</p>

</body>
</html>
~~~~~

En este caso, se crea una nueva página estática usando `write` sobre el
documento que hemos creado. No es que sea demasiado útil (se podría usar
el URL directamente pasándoselo como parámetro a `open`) pero demuestra
las posibilidades del mismo, que también se pueden ver en [este mini-tutorial](http://www.htmlgoodies.com/beyond/javascript/javascript-dynamic-document-creation-in-new-windows.html). 

## Selectores

Las hojas de estilo [CSS](https://es.wikipedia.org/wiki/CSS) son una
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

La [sintaxis más general está especificada por la W3](http://www.w3.org/TR/CSS2/selector.html) y se puede observar en
cualquier hoja de estilo. De esta, extraemos
[los 30 selectores que se deben memorizar](http://net.tutsplus.com/tutorials/html-css-techniques/the-30-css-selectors-you-must-memorize/),
principalmente `#` que se refiere a un id específico (por ejemplo,
`#ej.1.1` seleccionaría un div declarado como `div id='ej1.1.1'` y `.`
que se refiere a una clase; `.ej` por ejemplo seleccionaría todos los
div declarados así: `div class='ej'`.

## Eventos

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

~~~~~html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-15">
<title>Probando onLoad</title>
</head>

<body onLoad='alert("Ahora está todo cargado")'>
<h1>Esta es una página que no tiene gran cosa</h1>

<p>Pero podría tenerla.</p>

<hr>
<address></address>
<!-- hhmts start -->Last modified: Sun Apr  7 19:49:52 CEST 2013 <!-- hhmts end -->
</body> </html>
~~~~~

El uso de evento está hacia el final del código, donde usamos `alert`
que se activa tras el evento `load`, es decir, cuando se carga la
página

>En realidad, fuera de ejemplos puramente académicos, `alert` no debe
>usarse por problemas de usabilidad, es una práctica nefasta. Por eso,
>es mucho mejor que sustituyas esa orden por `console.log("Ahora está
>todo cargado")`

## Bibliografía

Prácticamente toda la bibliografía sobre JavaScript, al menos hasta
hace unos años, estaba enfocada a trabajar con JS en el
navegador así que encontrar referencias sobre este capítulo no debería
ser un problema. También la
[sección del tutorial de Víctor Rivas dedicada a este tema](http://vrivas.es/javascript-2014/js_window.html)
es, como siempre,
útil. [AprenderAProgramar](http://aprenderaprogramar.com/index.php?option=com_content&view=article&id=859:javascript-redireccionar-y-recargar-webs-windowlocation-href-hostname-assign-reload-replace-cu01171e&catid=78:tutorial-basico-programador-web-javascript-desde-&Itemid=206)
incluye también una referencia de los objetos disponibles. 
