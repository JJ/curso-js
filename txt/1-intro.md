# ¿JavaScript? Pero si es muy fácil


##Objetivos de este capítulo
-   Aprender qué es JavaScript
-   Aprender la sintaxis de JavaScript
-   Usar objetos y clases en JavaScript
-   Realizar un pequeño ejemplo en JavaScript

## Introducción
Lejos de ser solamente un lenguaje para el navegador,
[JavaScript](http://es.wikipedia.org/wiki/JavaScript) tiene una ventaja
frente a otros lenguajes de programación Está *en todas partes*. No hay
ordenador sin navegador, ni hay navegador sin JavaScript. Se puede
ejecutar hasta en el navegador Opera que viene con la Wii; desde la
madurez de [node.js](http://nodejs.org), es el único lenguaje que
permite ejecutar aplicaciones en cliente y servidor, así que se ha
convertido en uno de los lenguajes más útiles para desarrollo en
Internet.

Esto se debe, en parte a que ha sido definido como un [estándar ECMA
(denominado ECMAScript)](https://es.wikipedia.org/wiki/ECMAScript) lo
que da lugar a muchas implementaciones diferentes, que son, además,
independientes del fabricante. Y, por otro lado, también suele usar un
conjunto de objetos estándar (que no son estrictamente parte de un
lenguaje) que se pueden usar para añadir funcionalidad a una aplicación.
Muchas aplicaciones complejas, como [GMail](http://gmail.com) o [Google
Apps](http://drive.google.com) dependen de estos objetos para crear
aplicaciones en la web que se comporten como si se ejecutaran en un
sistema operativo nativo; a estas aplicaciones se les ha denominado
últimamente *Rich Internet Applications*.

Además, a diferencia de otros lenguajes, es muy fácil crear una
aplicación distribuida, cliente/servidor o MVC con JavaScript. Tanto por
su integración con el navegador (parte inseparable de la web, una
arquitectura cliente-servidor) como por los objetos que suele tener el
mismo, crear una aplicación cliente-servidor es casi trivial y ha dado
lugar a un estilo de programación denominado
[AJAX](http://es.wikipedia.org/wiki/AJAX), que se verá más adelante.

Para ejecutar JavaScript no hace falta más que un navegador, pero
también hay entornos para trabajar con él de forma autónoma, tal como el
[Mozilla
SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey)
y el [Rhino](https://developer.mozilla.org/en-US/docs/Rhino), éste
último basado en Java; [hay una lista de intérpretes completa que se
puede
usar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Shells).
Conviene instalar alguno de ellos para poder ejecutar los programas de
ejemplo; por ejemplo, para instalar el primero habrá que ejecutar (desde
la consola de administrador o superusuario):

	bash% apt-get install js

(que no funcionará en las últimas versiones de ubuntu, como la 14.04) o

	bash% apt-get install rhino

o

	bash% apt-get install libmozjs-24-bin

que instalará Spidermonkey en el fichero `js24`

Hay algunas diferencias entre los intérpretes, sobre todo en cualquier
función que tenga que ver con la entrada/salida. Conviene consultar la
página de manual del intérprete para ver cómo se hace específicamente en
cada caso; en general, los ejemplos que se incluyen aquí funcionan
correctamente en `js` o `rhino`.

En cuanto a los navegadores, puede que haga falta activar JavaScript
para que lo entiendan. Por ejemplo, en Firefox hay que activarlo usando
Edit -\> Preferencias -\> Contenido -\> Activar JavaScript. Normalmente
está activado por omisión. Por otro lado, veremos ejemplos
principalmente de programas que se pueden usar desde el intérprete, y
merece la pena instalarse uno.

Si usas Eclipse, puede que te venga bien el [plugin
JSDT](http://www.eclipse.org/webtools/jsdt/). Igual al atento lector le
funciona correctamente. Por otro lado, el `emacs` va de lujo. NetBeans
tiene también [soporte para
JavaScript](http://netbeans.org/kb/docs/ide/javascript-editor.html),
simplemente seleccionando este lenguaje para un nuevo fichero. El editor
detecta la estructura del fichero e incluso analiza el código indicando
los problemas, indentando automáticamente y emparejando paréntesis y
llaves.

En realidad, esa integración con el navegador puede que haya estorbado a
la aceptación de JS como un lenguaje *decente*; tampoco ha ayudado que
la mayoría de las librerías que se hayan desarrollado estén relacionadas
precisamente con la Web, y no tenga una librería decente para, pongamos
por caso, acceder a bases de datos. Pero también ha permitido que el
lenguaje siga siendo *pequeño*, y se haya desarrollado principalmente a
base de añadir objetos y clases externas al mismo. En resumen, que en el
marco de eso que se ha venido en llamar [web
2.0](http://es.wikipedia.org/wiki/Web_2.0) JS se ha convertido en
adulto, y merece la pena estudiarlo como cualquier otro lenguaje.

Por último está el [1st JavaScript
Editor](http://www.yaldex.com/JSFactory_Pro.htm), que es de pago, pero
pueden conseguirse versiones de evaluación gratuitas.

Por lo que he probado, SpiderMonkey, Rhino y KJSCMD se instalan
fácilmente en Ubuntu; no hay más que hacer `aptitude search javascript`
(en ubuntu) y salen esos y alguno más. Fedora Core es un poco más rácano
en cuanto a entornos: aunque los puedes instalar bajándote los fuentes y
compilando, el que está disponible en los repositorios es uno llamado
sólo `js`, aparentemente el SpiderMonkey. Para instalarlo, escribir
`yum install js`. El Gnome Shell (incluido en la versión 3.0 de Gnome)
incluye también un intérprete de JavaScript como lenguaje nativo, y con
él se pueden desarrollar pequeños applets. Este intérprete, que está
instalado por defecto junto con el entorno, se denomina `gjs`, está
basado en SpiderMonkey y tiene la ventaja de que está integrado con
todas las librerías de Gnome, de forma que se pueden hacer programas
tales como [este, que crea una ventana con un
botón](https://github.com/JJ/curso-js/tree/master/code/g.js) sin
necesidad de instalar ningún módulo adicional. Éste intérprete es el que
usa desde `lg` (*looking glass*), una consola de depuración de Gnome al
estilo de la consola del navegador que se puede ejecutar desde entorno
pulsando Alt-F2 y escribiendo `lg`. Finalmente, Windows incluye [un
programa de línea de órdenes denominado `cscript` y
`wscript`](http://stackoverflow.com/questions/686377/windows-command-line-javascript)
que, una vez más, tiene ciertas diferencias con respecto al resto de los
intérpretes (todo lo relacionado con I/O); en realidad se trata de
JScript, otra implementación del estándar ECMAscript.

También se puede instalar como cliente y servidor JavaScript
[node.js](http://nodejs.org), un procesador de bucles de eventos que es
también intérprete en JavaScript. Y mucho más...

## Primer programa en JavaScript

~~~~~~
#!/usr/bin/js
print( 'Hola, Mundo' );
~~~~~~

En realidad, el JS es bastante parecido al C, y, para el caso, también
al Java. Este programa producirá (siempre que lo hagamos ejecutable con
`chmod +x hola.js` previamente):

~~~~~
jmerelo@vega:~/txt/docencia/AAP/Temario$ ./hola.js Hola, Mundo
~~~~~

Podemos probar con diferentes intérpretes que tengamos instalados.

~~~~~~
jmerelo@penny:~/code$ gjs hola.js
Hola, Mundo
jmerelo@penny:~/code$ rhino hola.js
Hola, Mundo
jmerelo@penny:~/code$ js hola.js
Hola, Mundo
~~~~~~

**Ojo**: en node.js habría que cambiar `print` por `console.log`, o
tendremos un error. Con `kjs` habrá que ejecutarlo también directamente
desde la línea de órdenes; con un fichero da un error y no he encontrado
ningún manual específico sobre él, así que no aconsejo usar esa versión
de JS. Por otro lado, [este programa, `hola-g.js`, sería equivalente
para el intérprete `gjs` que viene con
Gnome](https://github.com/JJ/curso-js/tree/master/code/hola-g.js).

Para ejecutarlo desde el navegador habrá que hacer una poca más de
historia, pero tampoco tanto. Lo vemos en [este ejemplo (darle a ver
fuente para ver el
código)](https://github.com/JJ/curso-js/tree/master/code/hola-js.html)
donde se incluye el programa en JS de esta forma:

~~~~~
<script type='text/javascript' src='hola.js'></script>
~~~~~


El problema es que, en este caso, la orden `print` se interpreta como
impresión por impresora, y habrá que cambiarla por otra que signifique
lo mismo, escribir en el dispositivo de salida que se esté
[usando](https://github.com/JJ/curso-js/tree/master/code/hola-js-2.html):

~~~~~
document.writeln('Hola, Mundo')
~~~~~


Lo que también se puede escribir directamente
[así](https://github.com/JJ/curso-js/tree/master/code/hola-js-3.html):

~~~~~
<script  type='text/javascript'>document.writeln('Hola, Mundo')</script>
~~~~~


Estos programas se pueden usar con cualquier editor de texto, Emacs,
Sublime Text o Notepad++; también con los entornos integrados, que te
ofrecerán ventajas adicionales como completar las variables y los
nombres de los comandos.

## Estructuras de control en JavaScript

Vistas ya las mil y una formas de escribir cosas en la pantalla,
procedamos a temas más escabrosos, como lo que viene siendo hacer algo
*realmente*. Por ejemplo, un bucle que cree una tabla HTML, como se hace
en el siguiente
[programilla](https://github.com/JJ/curso-js/tree/master/code/tabla.js):

~~~~~~javascript
#!/usr/bin/js24

var tabla="table";
var celda="td";
var fila="tr";
var matriz = [1,2,3];
print( "<"+tabla+">");
for (i in matriz ) {
  print( "\t<"+fila+">");
  for ( j in matriz ) {
    print ("\t\t<"+celda+">"+matriz[i]*matriz[j]+"</"+celda+">");
  }
  print ("\t</"+fila+">\n");
 }
print ("</"+tabla+">");
~~~~~~

Este programa tiene dos bucles anidados, que imprimen un producto dentro
de una tabla. La salida será tal que así (ver el fuente para la
estructura):

  --- --- ---
  1   2   3
  2   4   6
  3   6   9
  --- --- ---

El programa es menos complicado de lo que parece. Para declarar
variables en JS se usa el genérico `var`, aunque también se pueden
declarar tipos específicos. Para no pillarnos los dedos, usamos var. En
realidad, tampoco hace falta: simplemente usando una variable aparece
mágicamente. Con las matrices ocurre igual (es decir, se declaran y se
les asigna valor directamente) : `matriz` lo es, y simplemente se
declaran sus valores entre corchetes. Ojo con los nombres de variables,
que a diferencia de otros lenguajes, distinguen entre mayúsculas y
minúsculas. `esta_variable` es diferente de `esta_Variable`.

JS puede usar un tipo de bucle que tienen la apariencia habitual (en
lenguajes derivados del C), y se pueden usar igual que en C, pero
haremos un bucle que recorra la matriz, usando un *iterador* `i`, que en
este caso se comporta como una variable de bucle de las de toda la vida.
Usamos el `+` para concatenación de cadenas, y poco más. El resto es
como el C, o el Java. De hecho, se pueden usar los bucles clásicos con
comparación e incremento, como se muestra en
[`tabla1.js`](https://github.com/JJ/curso-js/tree/master/code/tabla1.js):

~~~~~~javascript
var tabla="table";
var celda="td";
var fila="tr";
print( "<"+tabla+">");
for (i=1; i<=3; i++ ) {
    print( "<"+fila+">");
    for ( j=1; j<=3; j++  ) {
	print ("<"+celda+">"+i*j+"</"+celda+">");
    }
    print ("</"+fila+">\n");
}
print ("</"+tabla+">");
~~~~~~

Aunque queda un poco torpe tanto \<\>... vamos a reducir un poco el
programa, haciéndolo [más
elegante](https://github.com/JJ/curso-js/tree/master/code/tabla2.js)
(aunque más largo: no se puede tener todo):

~~~~~~javascript
var matriz = [1,2,3];
print( marca('table'));
for (i in matriz ) {
  print( marca( 'tr' ));
  for ( j in matriz ) {
    print ( celda(matriz[i]*matriz[j]));
  }
  print ( finmarca('tr'));
}
print (finmarca('table'));

function marca( m ) {
  return "<"+m+">";
}

function finmarca( m ) {
  return "</"+m+">";
}

function celda( contenido ) {
  return marca("td")+contenido+finmarca("td");
}
~~~~~~

La principal diferencia con respecto al anterior es el **uso de
funciones**. Las funciones en JS tienen una estructura bastante clásica:
`function` nombre-de-función (param1, param2...). Una vez más, se nota
que JS no e un lenguaje con tipos fuertes, pudiendo pasar los parámetros
sin tipo, y adaptándose dentro de la función al tipo necesario. Se pasan
por valor, es decir, que las modificaciones al parámetro formal no se
trasladan a la variable que se use. Además, se pueden declarar donde a
uno le dé la gana. Para llamarlas tampoco hay que hacer nada especial,
se usa el clásico paréntesis. La salida es exactamente la misma que
antes. El también clásico `return` devuelve un valor.

El ámbito de las variables es el bloque donde aparecen o se declaran,
pero hay que tener en cuenta que, a efectos de JS, una página web es un
*programa*. Se pueden declarar variables en la cabecera del documento
HTML, y estarán accesibles en cualquier otro sitio, siempre que esté mas
adelante en el documento. También habrá que tener en cuenta, en caso de
que esté incluido en una página web, que aunque la declaración de una
subrutina afecte a todo el programa, puede que esa parte de la página no
se haya cargado todavía, con lo que no estará disponible. Una vez más,
la programación distribuida no es totalmente igual a la programación en
otros lenguajes.

## Clases y objetos en JavaScript

JavaScript es un lenguaje basado en objetos, aunque un tanto peculiar;
en realidad, de casi todas las características de un lenguaje orientado
a objetos, solo tiene los objetos, e incluso estos son un tanto
peculiares. Por eso no es exactamente *dirigido a objetos* u *orientado
a objetos*. Las características las veremos en el siguiente
[programa](https://github.com/JJ/curso-js/tree/master/code/quiniela.js),
que podría servir para hacer quinielas.

~~~~~~javascript
// Definición de la clase Partido
function Partido(local,visitante) {
  this.local = local;
  this.visitante=visitante;
  this.resultado=null;
}

var equipos= new Array('Madrid', 'Barça', 'Atleti', 'Geta', 'Betis', 'Depor', 'Sevilla', 'Graná');

var midsize = equipos.length/2;
var quiniela = new Array( midsize );
for ( i=0; i < midsize ; i++ ) {
  var equipo1 = equipos.splice(Math.floor( equipos.length*Math.random()) , 1);
  var equipo2 = equipos.splice(Math.floor( equipos.length*Math.random()), 1);
  quiniela[i] = new Partido( equipo1, equipo2 );
 }

for ( i in quiniela ) {
  print( "Partido " + (parseInt(i)+1)+": " + quiniela[i].local + " - " + quiniela[i].visitante);
}
~~~~~~

Con lo primero que nos enfrentamos es con una nueva forma de definir una
matriz o `Array`: ya que sabemos que JS es OO, pues usamos una forma OO
de definirlo, mediante la orden `new`, que, como en Java y en C++, crea
un nuevo objeto llamando al *constructor* del mismo. En este caso le
pasamos directamente los elementos que constituyen el vector o *array*,
pero podríamos haberle pasado el tamaño de esta forma:
`var myArray = new Array(33);` Los objetos así creados son
objetos de pleno derecho, y se puede acceder a sus propiedades con
métodos usando también una sintaxis clásica: el puntito `.` tras el
nombre de la variable. Por ejemplo, `myArray.length` devolvería el
tamaño de la matriz

Pero como lo que se trata en este programa es de definir nosotros una
clase, lo hacemos en las líneas siguientes, en la función `Partido`, que
convencionalmente ponemos en mayúscula, para indicar que es un nombre de
clase. En realidad, una clase en JS es una función dentro de la cual se
le asigna un valor a la variable `this`, como en esta: cada uno de los
elementos de la variable `this` será una variable de instancia. Como se
ve, aquí no hay encapsulación ni perrito que le ladre.

Lo que vamos a crear es un vector de estos partidos, e irle asignando
valores extraídos aleatoriamente. Mientras tanto, usamos los métodos que
llevan objetos de clases estándar JS; igual que otros lenguajes tienen
librería estándar, JS tiene clases estándar: `Array`, que ya hemos
visto, y `Math`. Lo que usamos de `Math` son métodos de clase, no de
instancia, tales como `Math.random`, que genera un número aleatorio
entre 0 y 1. También se usa un método de instancia, `splice`, que extrae
una parte del vector de equipos; extraemos el seleccionado, para que no
moleste mientras generamos el resto de la quiniela.

Y el objeto lo creamos mediante una clásica llamada:

    quiniela[i] = new Partido( equipo1, equipo2 );

Más adelante usamos un bucle `in` para escribir los valores de cada uno
de los partidos; las variables no están encapsuladas, así que se puede
acceder a ellas directamente: `partido.local`, por ejemplo. Hay también
un pequeño truco: el uso de `parseInt` dentro de `print` para que se
interprete `i` como un número entero, no como una cadena, y, por tanto,
el `+` que lo sigue como una suma normal y no una concatenación de
cadenas. `i+1` daría `11`, mientras que `parseInt(i)+1` dará 2.

Y el resultado, aleatorio por supuesto, será algo así como esto:

    Partido 0: Graná - Atleti
    Partido 1: Madrid - Depor
    Partido 2: Betis - Barça
    Partido 3: Sevilla - Geta

Añadir métodos de clase se hace más o menos de la misma forma, que no es
muy ortodoxa, pero es la que hay. Lo veremos en [el siguiente
programa](https://github.com/JJ/curso-js/tree/master/code/quiniela2.js),
del que sacamos el fragmento más interesante:

~~~~~~javascript
// Definición de la clase Partido
function Partido(local,visitante) {
  this.local = local;
  this.visitante=visitante;
  this.resultado=null;
  this.setResultado = setResultado;
  this.toString = toString;
}

function setResultado( esteResultado ) {
  if ( esteResultado == '1' || esteResultado=='x' || esteResultado=='2' ) 
    this.resultado = esteResultado;
}

function toString() {
    return "Partido " + i + ": " + quiniela[i].local + " - " + quiniela[i].visitante + " = "+ this.resultado;
}
~~~~~~

Añadimos un par de funciones, y para que *pertenezcan* a la clase, hala,
con un `this` por aquí y un `this` por allá, solucionado. Es de buen
gusto llamar al método con el mismo nombre que la función, para no
despistarse; también seguir una cierta convención para ponerles nombres:
`get`, o `to`, o cosas por el estilo. Lo que no es de recibo es llamar a
una función que cambia el valor de la variable igual que la variable,
porque entonces nos liamos. Y como ya hemos visto antes como se llama a
los métodos de instancia, pues listos. No se hable más.

## Matrices asociativas

Pero hay más matrices, aparte de las lineales: JS, como muchos otros
lenguajes, permite trabajar con *matrices asociativas* (también llamadas
*diccionarios* o *hashes*). En una matriz asociativa, la clave es una
cadena, en vez de un número, lo que le da mucha más flexibilidad a la
hora de almacenar información. En un vector, se accede a cada uno de los
elementos del vector a través de un índice numérico, y eso implica
también un orden en su estructura (y, a veces, una continuidad en su
almacenamiento, aunque no necesariamente tiene que ser así). Es decir,
un vector lineal es un grupo de parejas (0, valor[0], 1, valor[1],....,
n, valor[n]). De hecho, como los números suelen ser sucesivos, muchas
veces se dan por sobreentendidos, de forma que para trabajar con un
vector (ejecutar una operación sobre sus valores, por ejemplo) sólo se
usan sus valores: valor[0], valor[1],..., valor[n].

Sin embargo, una matriz asociativa, diccionario, mapa o
[Tabla\_hash](http://es.wikipedia.org/wiki/Tabla_hash) (o simplemente
*hash*) está compuesto por una serie de pares (cadena alfanumérica,
valor): (cadena~1~, valor~1~, cadena~2~,valor~2~... cadena~n~,
valor~n~). Los valores están asociados a su cadena correspondiente; de
forma que se accede a los valores a través de la cadena alfanumérica
usada para indexarlos, que se suele denominar *clave* (*key*). Casi
todos los lenguajes de programación tienen alguna forma de usar estas
matrices asociativas. Por ejemplo, en Perl:

~~~~~perl
my %matrizAsociativa; # % para matrices asociativas
$matrizAsociativa{'variable'}='Valor'; # { para las claves print $matrizAsociativa{'variable'};
~~~~~

devolvería `Valor`.

Las usaremos en el [siguiente
programa](https://github.com/JJ/curso-js/tree/master/code/liga.js), que
genera aleatoriamente diez jornadas de una liga, y asigna puntuación
según los resultados:

~~~~~~javascript
load('Partido.js');

var equipos= new Array('Madrid', 'Barça', 'Atleti', 'Geta', 'Betis', 'Depor', 'Sevilla', 'Graná');

function jornada( estosEquipos ) {

  var equiposAqui = new Array;
  equiposAqui = equiposAqui.concat(estosEquipos);
  var midsize = equiposAqui.length/2;
  var quiniela = new Array( midsize );
  var unox2 = new Array( '1','x','2');
  for ( var i=0; i < midsize ; i++ ) {
    var equipo1 = equiposAqui.splice(Math.floor( equiposAqui.length*Math.random()) , 1);
    var equipo2 = equiposAqui.splice(Math.floor( equiposAqui.length*Math.random()), 1);
    quiniela[i] = new Partido( equipo1, equipo2 );
    quiniela[i].setResultado( unox2[Math.floor( 3*Math.random()) ]);
  }
  return quiniela;
}
~~~~~~

En parte, este programa es similar a los anteriores: la parte que
generaba cada jornada está ahora en una función, que devuelve un `array`
de resultados, que se guardan en el array `quinielas`. Hemos sacado,
además, la definición de la clase `Partido` a un fichero externo, que
cargamos con `load`. Por otro lado, como a la función `jornada` se le
pasa una referencia al vector con los equipos, tenemos que copiarlo a
una variable local, definiéndola (`equiposAqui`), y concatenándole
(`concat`) el vector que se le pasa por valor, que es igual que
copiarlo, pero seo hace en una sola orden.

El truco está a partir de la definición de la variable `resultados`.
Esta variable es una matriz asociativa que contendrá la puntuación de
los equipos, y estará indexada por el nombre del equipo. Se declara
igual que los demás arrays, y, para inicializarlo, vamos extrayendo los
valores del vector de equipos, y usándolos como clave:
`resultados[equipos[i]]=0;` `equipos[i]` valdrá sucesivamente
Barça, Graná... y así se irán inicializando a 0 los valores
correspondientes. Si no se inicializan, la primera vez que se usa una
variable tiene el valor `NaN`, con el que no se puede hacer nada. Es así
de arisco.

Más adelante se va recorriendo en un bucle doble los partidos de cada
una de las jornadas, y asignando puntuación dependiendo del resultado de
la quiniela. Se usa la construcción `if... else if       ... else`, que
funciona de la forma habitual, aunque también podríamos haber usado
`switch`, como en [el siguiente
programa](https://github.com/JJ/curso-js/tree/master/code/liga2.js), que
en lo único que cambia es en estas líneas:

~~~~~~
switch (resultado) {
    case '1':
      resultados[local]+=3;
      break;
    case 'x':
      resultados[local]+=1;
      resultados[visitante]+=1;
      break;
    default:
      resultados[visitante]+=3;
    }
~~~~~~

y que viene a ser como el anterior, pero con `case`s en vez de `if`s.
Vamos, tres cuartos de lo mismo.

## Manejando Objetos

En realidad, todo en JavaScript es un objeto, y especialmente los
vectores: tanto los vectores tradicionales como las matrices asociativas
como los objetos se representan internamente de la misma forma, y te
puedes referir a ellos de diferentes maneras. Vamos a usar el depurador
interactivo para verlo, ejecutando simplemente `rhino`, o `kjs`
en la línea de comandos. Una vez hecho, tecleamos las siguientes
órdenes:

~~~~~
js> foo = new Array
js> foo.cero='Cero' Cero
js> foo[1] = 'Uno' Uno
js> foo['dos'] = 'Dos' Dos
js> foo.dos Dos
js> foo['cero'] Cero
js> for ( i in foo) { print(foo[i]);}
Cero Uno Dos
~~~~~

Hay que teclear lo que se encuentra detrás de `js>`; cada segunda línea
es la respuesta del intérprete a nuestras órdenes. En la primera,
creamos un vector, y le asignamos valor a tres elementos de formas
diferentes: usando la notación de objeto (con el .) para el 0, la
notación de vector para el 1, y la notación de matriz asociativa para el
2. Luego se ve que, independientemente de cómo se haya asignado el
valor, se puede usar cualquier otra notación para acceder al elemento;
y, finalmente, vemos como se puede recorrer de forma uniforme el array
usando sus componentes mediante la orden `in`.

Por eso precisamente, hay que tener un poco de cuidado con estos arrays
asociativos que se comportan un poco como les da la gana. Es conveniente
usar para ellos `Object`, que es lo que son, en vez de `Array`. De
hecho, si en lo anterior sustituimos `Array` por `Object` dará
exactamente el mismo resultado. Por eso [se consideran perniciosas los
arrays asociativos en
JS](http://andrewdupont.net/2006/05/18/javascript-associative-arrays-considered-harmful/),
pero es simplemente una cuestión de convención.

No todo va a ser público en un objeto; también pueden tener su intimidad
guardada en variables privadas:

~~~~~
js> function Foo( bar ) { this.bar = bar; var privada = 7;}
js> var este_foo = new Foo( 'correquetepillo' );
js> print(este_foo.bar) correquetepillo
js> print(este_foo.privada) undefined
~~~~~

Es tan secreta, de hecho, que ni siquiera te dice que no existe:
simplemente que su valor está indefinido.

El propio estándar JavaScript (ECMAScript) define una serie de clases
que se pueden instanciar, que corresponderían a la librería estándar (o
librería estándar de clases) en otros lenguajes. Una de ellas ya la
hemos visto: la clase `Array`. Otra es la clase `String`, que se usa
para manejar cadenas alfanuméricas, chorros de 0s y 1s.

    js> var cadena = new String("1");
    js> print(cadena + 1) 11
	
La clase `String` tiene una serie de métodos que permiten hacer lo
habitual con las cadenas: encadenarlas, dividirlas, y buscar cosas.

	js> var nombres = "Pedro, Lucas, Juan".split(", ");
	js> print(nombres[0]) Pedro
	
En este caso, `split` es un método de la clase String, y lo estamos
aplicando directamente sobre la cadena `"Pedro, Lucas, Juan"`, que, de
por si, es un objeto de esa clase. `split` divide la cadena usando los
caracteres que le pasamos, y da lugar a un `Array` con tantos
componentes como resulte.

De camino, podría haber una clase para escribir y leer ficheros, porque
con el rato que llevamos, todavía no hemos visto ninguna, y, además,
cualquier lenguaje decente escribe y lee ficheros. Es más, es que muchos
no hacen otra cosa, ¿no? Pues no. El estándar JS no define ningún tipo
de rutina de E/S. Pero si usamos el intérprete Rhino (en vez de
SpiderMonkey, que es el que hemos venido usando), podemos usar clases de
Java directamente, lo que complica terriblemente el programa, pero [ahí
está, de todas
formas](https://github.com/JJ/curso-js/tree/master/code/lee_quiniela.js):

~~~~~~javascript
// ejecutar con rhino lee_quiniela.js <argumento>
load('Partido.js');
var FileReader = java.io.FileReader;
var BufferedReader =java.io.BufferedReader;

var file_name = arguments[0];

var f = new FileReader(file_name);
var br = new BufferedReader( f );
var resultados= new Array;
var line = new String;
while ((line = br.readLine()) != null) {
    var estaLinea = new String( line );
    var resultado  = estaLinea.split(" ");
 
    switch (resultado[2]) {
    case '1':
	if ( resultados[resultado[0]] ) {
	    resultados[resultado[0]]+=3;
	} else {
	    resultados[resultado[0]]=3;
	}
	break;
    case 'x':
	if ( resultados[resultado[0]] ) {
	    resultados[resultado[0]]+=1;
	} else {
	    resultados[resultado[0]]=1;
	}
	if ( resultados[resultado[1]] ) {
	    resultados[resultado[1]]+=1;
	} else {
	    resultados[resultado[1]]=1;
	}
	break;
    default:
	if ( resultados[resultado[1]] ) {
	    resultados[resultado[1]]+=3;
	} else {
	    resultados[resultado[1]]=3;
	}
	break
    }
}

for ( var i in resultados ) {
    print( i + ": " + resultados[i])
}

~~~~~~

El programa es bastante similar al anterior, pero lee de fichero en vez
de generar los resultados aleatoriamente. Y lo lee aproximadamente de la
misma forma a como se haría en Java. Por eso hay que usar Rhino, que
permite usar las clases de la librería estándar de Java de forma
*nativa*. En este caso usamos dos clases: `FileReader` y
`BufferedReader`, para poder leer de línea en línea. La única diferencia
a como se haría en Java es que hay que pasar la línea leída de un objeto
`String` de Java a un objeto `String` de JS, que es lo que se hace en
`var estaLinea = new String( line );`. También sale un poco más largo
porque, como indicamos en el programa de más arriba, los elementos de un
`Array` hay que inicializarlos; en cada caso del `switch` comprobamos si
están inicializados o no antes de sumarles; si no lo está, le asignamos
el valor directamente.

En realidad, las primeras líneas lo único que hacen es declarar un
*alias* para las clases de Java. En JS una variable puede contener
cualquier cosa, incluso una clase. Así acortamos el nombre, y parecen
más de javascrí.

La otra diferencia es también cómo se ejecuta el fichero:
`rhino lee_quiniela.js quiniela.datos` para ejecutarlo sobre
el [fichero
`quiniela.datos`](https://github.com/JJ/curso-js/tree/master/code/quiniela.datos),
que dará el resultado siguiente:

	Elche: 1
	Atleti: 3
	Cai: 1
	Athleti: 6
	Bar~a: 1
	Madrid: 2
	H~rcules: 1
	
Queda con esto más o menos claro que para ir donde nadie ha ido antes
con JS, hay que meterse un poco en Java. Pero no siempre. Tenéis alguna
información más en [este tutorial de
Mozilla](http://www.mozilla.org/rhino/ScriptingJava.html), que te
explica como importar espacios de nombres completos e incluso como
implementar interfaces de Java.

Aunque no lo parezca, JS es todavía un lenguaje joven, al que le faltan
gran cantidad de librerías básicas, y, especialmente, una forma
centralizada de empaquetar, probar y distribuir esas librerías, como
[CPAN](http://www.cpan.org) para Perl o GEMs para Ruby. Hay algo por el
estilo, [llamado OpenJSAN](http://openjsan.org), de JS Archive Network.
Para instalarlo hace falta Perl, y sólo hay unas pocas librerías
todavía. Algunas muy útiles, pero siguen siendo unas pocas. Otras, como
la amplia [JSlib](http://code.google.com/p/jslibs/), sólo va en Windows.
En todo caso, a estas alturas parece un proyecto muerto.

La que si es popular es [Prototype](http://prototypejs.org/), una
librería que se usa principalmente en conjunción con RoR y AJAX, pero
resulta que necesita ejecutarse dentro del navegador, porque usa objetos
del mismo (como `document`, por ejemplo). Así que la dejaremos para más
adelante.

## Objetos para el camino: JSON

Lo interesante de los objetos en JS es que hay una forma muy fácil de
*serializarlos* (es decir, convertirlos en texto u otro formato de forma
que se puedan intercambiar fácilmente con otros programas a través de la
red); a este formato se le denomina
[JSON](http://es.wikipedia.org/wiki/JSON) (JavaScript Object Notation).
Y como en realidad, tal como se ha visto en el apartado anterior, todo
es un objeto en JS, se puede usar esta notación para asignar valores
prácticamente a cualquier cosa. Vamos a usar una vez más el intérprete
en modo interactivo para ver un ejemplo:

~~~~~
js> var objeto = { Madrid : 25, Atleti: 33, Ponferradina: 44 };
js> for (i in objeto) { print( i + " : "+ objeto[i] )}; Madrid : 25 Atleti : 33 Ponferradina : 44
~~~~~

Más fácil no puede ser. Se le asigna valor a un objeto con el formato
clave : valor (con coma al final), de la misma forma que se haría a un
array asociativo. Además, se pueden crear objetos sobre la marcha y
asignárselos a una variable cuyo valor se cree también sobre la marcha:

~~~~~
js> eval("var objeto2 = { Madrid : 25, Atleti: 33, Ponferradina: 44 }");
js> for (i in objeto2) { print( i + " : "+ objeto[i] )}; Madrid : 25 Atleti : 33 Ponferradina : 44
~~~~~

donde usamos `eval`, que interpreta una expresión en JavaScript como si
del propio intérprete se tratara. Las expresiones se pueden anidar, para
dar lugar a objetos más complejos

~~~~~
js> eval("var objeto2 = { Madrid : 25, Atleti: 33, Ponferradina: { casa: 33, fuera: 44} }");
js> for (i in objeto2) { print( i + " : "+ objeto2[i] )}; Madrid : 25 Atleti : 33 Ponferradina : [object Object]
~~~~~

Que parece más raro de la cuenta, pero que, con un poco de código, se
podría también imprimir.

Y JSON, precisamente, es uno de los formatos de intercambio, el más
simple, el que se usa en AJAX, y un modo de acceder también a servicios
web como *geonames*. Lo hacemos en [el siguiente ejemplo:
`json-geonames.html`](https://github.com/JJ/curso-js/tree/master/code/json-geonames.html),
del que extraemos el [código en JS (fichero
`geonames_call.js`)](https://github.com/JJ/curso-js/tree/master/code/geonames_call.js)

~~~~~~javascript
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

~~~~~~

Este ejemplo es un poco complicado, sobre todo, por el mecanismo que usa
para hacer la llamada, y que está contenido en el fichero
[`jsr_class.js`, que contiene la clase
`JSONscriptRequest`](https://github.com/JJ/curso-js/tree/master/code/jsr_class.js),
que será la que usemos para construir la llamada. La mecánica es la
siguiente: cada vez que se introduce un nombre de un pueblo o ciudad de
España, se genera un evento, y se llama a la función `search`. Esta
función construye una petición, dentro de la cual está incluido
`callback=getLocation`. El truco es que esa petición genera un
*callback* tal que cuando se recibe la respuesta se llama a la función
`getLocation` (definida más arriba).

Esa función recibe como variable en `jData` el resultado que, al estar
en formato JSON, ya está, de hecho, en el formato de un objeto en JS.
Por eso, en el bucle dentro de la función `getLocation` se trabaja
directamente con los datos obtenidos sin necesidad de hacer ningún tipo
de parsing.

## Funciones como objetos

Las funciones son objetos de pleno derecho en JavaScript. Se puede crear
una función como cualquier otro objeto, y de hecho ya hemos visto algo
parecido cuando hemos definido una clase (que es simplemente un tipo de
función). Como tales objetos, podemos pasarlas como parámetros y
modificarlas de diferentes formas; algo así hemos visto ya cuando hemos
definido objetos también, en los que se asignan los nombres de funciones
a métodos de una clase simplemente usando su nombre (en realidad, un
puntero a función). Las diferentes formas de definir funciones se
explican en [este post de StackOverflow (un recurso imprescindible, por
otro
lado).](http://stackoverflow.com/questions/1140089/how-does-an-anonymous-function-in-javascript-work)

Vamos a verlo a verlo a continuación, usando nuestra conocida quiniela;
usaremos una función para imprimir el resultado de la quiniela, de forma
que se pueda ver la salida de varias formas diferentes. En [el siguiente
módulo hacemos uso de esta
funcionalidad](https://github.com/JJ/curso-js/tree/master/code/Nuevo_partido.js):

~~~~~~javascript
// Definición de la clase Partido
function Nuevo_partido(local,visitante, resultado) {
    this.local = local;
    this.visitante=visitante;
    this.resultado=resultado;
    this.setResultado = setResultado;
    this.toString = toString;
    this.set_to_string = set_to_string;
    this.impresor = _toString;
}

function setResultado( esteResultado ) {
    if ( esteResultado == '1' || esteResultado=='x' || esteResultado=='2' ) 
	this.resultado = esteResultado;
}

function toString() {
    return this.impresor(this.local, this.visitante, this.resultado);
}

function _toString( local, visitante ) {
    return ": " + this.local + " - " + this.visitante + " = "+ this.resultado;
}

function set_to_string ( impresor ) {
    this.impresor = impresor;
}
~~~~~~

En esta clase la principal diferencia es que usamos el método `impresor`
como una variable al cual le podemos asignar diferentes valores, incluso
desde fuera. De esta forma se puede modificar el comportamiento de un
objeto: asignamos un comportamiento por omisión, pero si es necesario
podemos cambiar *desde fuera* el comportamiento de esa clase simplemente
asignándole un valor nuevo. De hecho, esto es lo que vamos a hacer en el
[programa siguiente
(`liga3.js`)](https://github.com/JJ/curso-js/tree/master/code/liga3.js):

~~~~~~javascript
#!/usr/bin/env js

load('Nuevo_partido.js');

var equipos= new Array('Madrid', 'Barça', 'Atleti', 'Geta', 'Betis', 'Depor', 'Sevilla', 'Graná');

function jornada( estosEquipos ) {
    var equiposAqui = new Array;
    var imprime = function( local, visitante, resultado ) { 
	print("Imprimiendo \n");
	return  "- " + local + " vs. " + visitante + " resultado  "+ resultado;
    };
    equiposAqui = equiposAqui.concat(estosEquipos);
    var midsize = equiposAqui.length/2;
    var quiniela = new Array( midsize );
    var unox2 = new Array( '1','x','2');
    for ( var i=0; i < midsize ; i++ ) {
	var equipo1 = equiposAqui.splice(Math.floor( equiposAqui.length*Math.random()) , 1);
	var equipo2 = equiposAqui.splice(Math.floor( equiposAqui.length*Math.random()), 1);
	quiniela[i] = new Nuevo_partido( equipo1, equipo2 );
	quiniela[i].setResultado( unox2[Math.floor( 3*Math.random()) ]);
	quiniela[i].set_to_string( imprime );
    }
    return quiniela;
}

var quinielas = new Array;
for ( var i = 0; i < 10; i ++ ) {
  quinielas[i] = jornada( equipos ); 
}

var resultados= new Array;
for ( var i in equipos ) {
  resultados[equipos[i]]=0;
}

for ( var i = 0; i < quinielas.length; i ++ ) {
    for ( var j = 0;j < quinielas[i].length; j ++ ) {
      var local = quinielas[i][j].local;
      var visitante = quinielas[i][j].visitante;
      var resultado = quinielas[i][j].resultado;
      switch (resultado) {
      case '1':
	  resultados[local]+=3;
	  break;
      case 'x':
	  resultados[local]+=1;
	  resultados[visitante]+=1;
	  break;
      default:
	  resultados[visitante]+=3;
      }
    }
}

for ( var i in resultados ) {
  print( i + ": " + resultados[i])
}

~~~~~~

Como en todos los scripts, habrá que tener en cuenta que la primera
línea, `#!/usr/bin/js`, tendrá que sustituirse por el intérprete de
JavaScript que usemos (`rhino`, `gjs`, `node` o el que sea; en este
último caso es probable que la línea sea `/usr/bin/local/node`). La
parte nueva de este programa está en en la línea 9, donde se define la
variable `imprime`. Se define una función *sin nombre* (lo que se suele
denominar un *closure* o función anónima) a la que podemos acceder
mediante la variable que le hemos asignado. Lo importante de esta
sintaxis es que las funciones son variables de pleno derecho, que
podemos usar como parámetros de otras funciones; esto se usará de forma
extensiva cuando veamos jQuery y node.js.

## CommonJS, una infraestructura común para carga de módulos

Uno de los problemas de JS es que, al haber sido desarrollado
principalmente para trabajar en el navegador, carece de una serie de
librerías comunes para trabajar en el servidor o en aplicaciones de
escritorio. [CommonJS](http://www.commonjs.org) es un intento de dar tal
infraestructura. Principalmente se trata de proveer una serie de
especificaciones para hacer cosas comunes, desde o más simple, que es
crear un módulo o librería hasta cosas más complejas: interacción con
consola o con línea de órdenes.

Por lo pronto la especificación que ha tenido más éxito es la de
módulos, que [se resume en este
artículo](http://dailyjs.com/2010/10/18/modules/); se trata de que un
módulo escrito para un intérprete (Rhino, por ejemplo) pueda funcionar
en otro (tal como node.js). Vamos a ver cómo adaptaríamos alguna de las
cosas hechas a este estándar, por ejemplo, cambiando esto sobre la clase
Nuevo\_partido.js creada anteriormente (la llamamos
[Un\_Partido](https://github.com/JJ/curso-js/tree/master/code/Un_Partido.js)).

~~~~~~javascript
// Definición de la clase Nuevo_partido
exports.Un_Partido = function (local,visitante,resultado) {
    this.local = local;
    this.visitante=visitante;
    this.resultado=resultado;
    this.setResultado = setResultado;
    this.toString = toString;
    this.set_to_string = set_to_string;
    this.impresor = _toString;
}

function setResultado( esteResultado ) {
    if ( esteResultado == '1' || esteResultado=='x' || esteResultado=='2' ) 
	this.resultado = esteResultado;
}

function toString() {
    return this.impresor(this.local, this.visitante, this.resultado);
}

function _toString( local, visitante, resultado ) {
    return ": " + local + " - " + visitante + " = " + resultado;
}

function set_to_string ( impresor ) {
    this.impresor = impresor;
}

~~~~~~

El único cambio ha sido que en vez de definir la función directamente,
se define como un atributo de `exports`. El resto, al ser atributos de
ese objeto, no hace falta que lo definamos de la misma forma. Al
llamarlo también habrá un pequeño cambio. Mientras que antes teníamos
que hacer un eval sobre lo cargado, ahora basta con ([programa
usa\_partido.js](https://github.com/JJ/curso-js/tree/master/codeusa_partido.js)):

~~~~~~javascript
var un_partido = require('./Un_Partido.js');
var este_partido = new un_partido.Un_Partido( 'este','otro','1');
console.log('Resultado ' + este_partido.toString());
~~~~~~

Este módulo ya se comporta como el resto de los módulos de Node,
haciendo falta usar sólo require (con el camino completo) para cargarlo.
Ahora, con require lo que definimos es un objeto, y las funciones son
atributos de ese objeto; por lo que a la hora de declarar nuevos objetos
de esa clase tendremos que hacerlo con `new un_partido.Un_Partido`. A
partir de ahí el objeto generado se comporta exactamente igual que
cualquier otro objeto, como podemos ver usando console.

A diferencia de casi todos los lenguajes de scripting, no hay un modo
estándar de instalar módulos JavaScript, aunque algunos intérpretes
(notablemente Node.js, del que hablaremos luego) sí lo tienen. De hecho,
ni siquiera common.js es universal, existiendo otras convenciones que le
hacen la competencia tales como [require.js](http://requirejs.org/). La
principal ventaja de common.js es su aceptación por parte de node.js,
precisamente y su uso en NPM, por eso cabe suponer que el resto
empezarán, más o menos, a usarlo. En todo caso, [son enfoques
diferentes](http://requirejs.org/docs/commonjs.html), uno se concentra
en la forma de cargar el módulo mientras que otro se concentra en la
forma de empaquetarlo.

## Para finalizar

Cualquiera de los recursos que listo ahí abajo pueden resultar útiles
para ampliar información sobre JavaScript. Quizás también pueda ser
interesante usar alguna librería que facilite su uso como
[Mochikit](http://mochi.github.com/mochikit/) o
[Prototype](http://www.prototypejs.org/). También el [Google Web
Toolkit](http://code.google.com/webtoolkit/) permite desarrollar en AJAX
programando sólo en Java, aunque pueda que el JS generado necesite algún
retoque adicional. Por supuesto, también es conveniente que se continúe con el siguiente capítulo. 

## Agradecimientos

Agradezco a los
[comentaristas](http://barrapunto.com/comments.pl?sid=69179) de [los
diferentes anuncios](http://barrapunto.com/comments.pl?sid=68032) que
[publiqué en Barrapunto](http://barrapunto.com/comments.pl?sid=67899)
sus comentarios y sugerencias. También a Javier Espigares por la lectura
y comentarios sobre las versiones previas de este texto.

## Bibliografía 

Hay dos libros fundamentales para aprender JS, aunque están muy
enfocados a JS en el navegador:[*JavaScript: The Definitive Guide*, el
libro del
rinoceronte](http://bencore.ugr.es/iii/encore/record/C|Rb2011082|Sjavascript+definitive+guide|Orightresult|X2?lang=spi&suite=pearl),
editado por O'Reilly, que está [disponible como recurso electrónico en
la
UGR](http://proquest.safaribooksonline.com/9781449393854?uicode=goliat)
y [*JavaScript Bible, de Danny Goodman*, un tocho
considerable](http://bencore.ugr.es/iii/encore/record/C|Rb1987808|Sjavascript+bible|Orightresult|X5?lang=spi&suite=pearl),
en el que hay de todo, y que viene con un útil CD con ejemplos. También
está como [recurso
electrónico](http://proquest.safaribooksonline.com/?uiCode=goliat&xmlId=9780470526910).
Hay [muchos más recursos, algunos de ellos disponibles de forma
electrónica](http://bencore.ugr.es/iii/encore/search/C|Sjavascript|Orightresult|U1?lang=spi&suite=pearl).

Como recursos adicionales, [las páginas de JavaScript en
Mozilla.org](%0A%20%20%20%20https://developer.mozilla.org/en-US/docs/JavaScript/About_JavaScript?redirectlocale=en-US&redirectslug=About_JavaScript),
el [estándar
completo](http://www.ecma-international.org/publications/standards/Ecma-262.htm),
y el [curso de JavaScript de Víctor Rivas
Santos](http://geneura.ugr.es/~victor/cursillos/javascript/js_intro.html).
