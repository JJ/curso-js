# Programación con objetos, que no "dirigida a"


##Objetivos de este capítulo

-   Entender qué es un objeto en JavaScript.
-   Usar objetos y clases en JavaScript
-   Aprender a modularizar una aplicación en varios ficheros. 

## Clases y objetos en JavaScript

JavaScript es un lenguaje basado en objetos, aunque un tanto peculiar;
en realidad, de casi todas las características de un lenguaje orientado
a objetos, solo tiene los objetos, e incluso estos son un tanto
peculiares.

>Esto está cambiando en las últimas versiones del lenguaje, empezando
>por ES6

Por eso no es exactamente *dirigido a objetos* u *orientado
a objetos*. Las características las veremos en el siguiente
[programa](https://github.com/JJ/curso-js/tree/master/code/quiniela.js),
que podría servir para hacer quinielas.

~~~~~javascript
// Definición de la clase Partido
function Partido(local,visitante) {
  this.local = local;
  this.visitante=visitante;
  this.resultado=null;
}

var equipos= new Array('Madrid', 'Barça', 'Atleti', 'Geta',
	'Betis', 'Depor', 'Sevilla', 'Graná');

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
~~~~~

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
muy ortodoxa, pero es la que hay. Lo veremos en [el siguiente programa](https://github.com/JJ/curso-js/tree/master/code/quiniela2.js),
del que sacamos el fragmento más interesante:

~~~
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
~~~

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
[Tabla\_hash](https://es.wikipedia.org/wiki/Tabla_hash) (o simplemente
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

Las usaremos en el [siguiente programa](https://github.com/JJ/curso-js/tree/master/code/liga.js), que
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
`switch`, como en [el siguiente programa](https://github.com/JJ/curso-js/tree/master/code/liga2.js), que
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

## Manejando objetos

En realidad, todo en JavaScript es un objeto, y especialmente los
vectores: tanto los vectores tradicionales como las matrices asociativas
como los objetos se representan internamente de la misma forma, y te
puedes referir a ellos de diferentes maneras. Vamos a usar el depurador
interactivo para verlo, ejecutando simplemente `rhino`, o `kjs`
en la línea de comandos. Una vez hecho, tecleamos las siguientes
órdenes:

~~~~~
js> foo = new Array
js> foo.cero='Cero' 
Cero
js> foo[1] = 'Uno' 
Uno
js> foo['dos'] = 'Dos' 
Dos
js> foo.dos 
Dos
js> foo['cero'] 
Cero
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
Java directamente, lo que complica terriblemente el programa, pero 
[ahí está, de todas formas](https://github.com/JJ/curso-js/tree/master/code/lee_quiniela.js):

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
el [fichero `quiniela.datos`](https://github.com/JJ/curso-js/tree/master/code/quiniela.datos),
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
información más en [este tutorial de Mozilla](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Scripting_Java), que te
explica como importar espacios de nombres completos e incluso como
implementar interfaces de Java.

Últimamente, los módulos de JavaScript se importan en Node usando
`npm` y en el cliente usando `bower`. Ambos usan GitHub o algún otro
repositorio para especificar la localización de los fuentes. Eso ha
hecho que haya muchas liberías populares, tales como [Prototype](http://prototypejs.org/), una
librería que se usa principalmente en conjunción con Ruby on Rails y
Ajax (que veremos más adelante), pero
resulta que necesita ejecutarse dentro del navegador, porque usa objetos
del mismo (como `document`, por ejemplo). Así que la dejaremos para más
adelante.

## Objetos para el camino: JSON

Lo interesante de los objetos en JS es que hay una forma muy fácil de
*serializarlos* (es decir, convertirlos en texto u otro formato de forma
que se puedan intercambiar fácilmente con otros programas a través de la
red); a este formato se le denomina
[JSON](https://es.wikipedia.org/wiki/JSON) (JavaScript Object Notation).
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

## Funciones como objetos

Las funciones son objetos de pleno derecho en JavaScript. Se puede crear
una función como cualquier otro objeto, y de hecho ya hemos visto algo
parecido cuando hemos definido una clase (que es simplemente un tipo de
función). Como tales objetos, podemos pasarlas como parámetros y
modificarlas de diferentes formas; algo así hemos visto ya cuando hemos
definido objetos también, en los que se asignan los nombres de funciones
a métodos de una clase simplemente usando su nombre (en realidad, un
puntero a función). Las diferentes formas de definir funciones se
explican en [este post de StackOverflow (un recurso imprescindible, por otro lado).](http://stackoverflow.com/questions/1140089/why-do-you-need-to-invoke-an-anonymous-function-on-the-same-line)

Vamos a verlo a verlo a continuación, usando nuestra conocida quiniela;
usaremos una función para imprimir el resultado de la quiniela, de forma
que se pueda ver la salida de varias formas diferentes. En [el siguiente módulo hacemos uso de esta funcionalidad](https://github.com/JJ/curso-js/tree/master/code/Nuevo_partido.js):

~~~javascript
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
~~~

En esta clase la principal diferencia es que usamos el método `impresor`
como una variable al cual le podemos asignar diferentes valores, incluso
desde fuera. De esta forma se puede modificar el comportamiento de un
objeto: asignamos un comportamiento por omisión, pero si es necesario
podemos cambiar *desde fuera* el comportamiento de esa clase simplemente
asignándole un valor nuevo. De hecho, esto es lo que vamos a hacer en el
[programa siguiente
(`liga3.js`)](https://github.com/JJ/curso-js/tree/master/code/liga3.js):

~~~javascript
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

~~~

Como en todos los scripts, habrá que tener en cuenta que la primera
línea, `#!/usr/bin/js`, tendrá que sustituirse por el intérprete de
JavaScript que usemos (`rhino`, `gjs`, `node` o el que sea; en este
último caso es probable que la línea sea `/usr/bin/env node`). La
parte nueva de este programa está en en la línea 9, donde se define la
variable `imprime`. Se define una función *sin nombre* (lo que se suele
denominar un *closure* o función anónima) a la que podemos acceder
mediante la variable que le hemos asignado. Lo importante de esta
sintaxis es que las funciones son variables de pleno derecho, que
podemos usar como parámetros de otras funciones; esto se usará de forma
extensiva cuando veamos jQuery y node.js.

## Require.JS, una infraestructura común para carga de módulos

Uno de los problemas de JS es que, al haber sido desarrollado
principalmente para trabajar en el navegador, carece de una serie de
librerías comunes para trabajar en el servidor o en aplicaciones de
escritorio. [CommonJS](http://requirejs.org/docs/commonjs.html) fue un intento de dar tal
infraestructura. Principalmente se trata de proveer una serie de
especificaciones para hacer cosas comunes, desde o más simple, que es
crear un módulo o librería hasta cosas más complejas: interacción con
consola o con línea de órdenes. Sin embargo, no acabó de tener éxito
por su falta de especificación de formatos de transporte, así que
finalmente se adoptó la especificación
[Require.js](http://requirejs.org/), que es la que
se usa, precisamente, en Node y en otros intérpretes populares.  

Por lo pronto la especificación que ha tenido más éxito es la de
módulos, que [se resume en esta presentación](https://darrenderidder.github.io/talks/ModulePatterns/#/4); se trata de que un
módulo escrito para un intérprete (Rhino, por ejemplo) pueda funcionar
en otro (tal como node.js). Vamos a ver cómo adaptaríamos alguna de las
cosas hechas a este estándar, por ejemplo, cambiando esto sobre la clase
`Nuevo_partido.js` creada anteriormente (la llamamos
[Un_Partido](https://github.com/JJ/curso-js/tree/master/code/Un_Partido.js)).

~~~javascript
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

~~~

El único cambio ha sido que en vez de definir la función directamente,
se define como un atributo de `exports`. El resto, al ser atributos de
ese objeto, no hace falta que lo definamos de la misma forma. Al
llamarlo también habrá un pequeño cambio. Mientras que antes teníamos
que hacer un eval sobre lo cargado, ahora basta con ([programa
usa\_partido.js](https://github.com/JJ/curso-js/tree/master/codeusa_partido.js)):

~~~javascript
var un_partido = require('./Un_Partido.js');
var este_partido = new un_partido.Un_Partido( 'este','otro','1');
console.log('Resultado ' + este_partido.toString());
~~~

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
ni siquiera require.js es universal, existiendo otras convenciones que le
hacen la competencia tales como [AMD](http://requirejs.org/docs/whyamd.html). La
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
[Prototype](http://www.prototypejs.org/). También el [Google Web Toolkit](http://www.gwtproject.org/?csw=1) permite desarrollar en Ajax
programando sólo en Java, aunque pueda que el JS generado necesite algún
retoque adicional. Por supuesto, también es conveniente que se
continúe con el siguiente capítulo.


## Bibliografía 

En
[la web del programador de Mozilla dan una visión extensa de la programación "basada en objetos" de JS](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Trabajando_con_objectos)
tras una
[introducción](https://developer.mozilla.org/es/docs/Web/JavaScript/Introducci%C3%B3n_a_JavaScript_orientado_a_objetos). El
[tutorial en Cristalab](http://www.cristalab.com/tutoriales/programacion-orientada-a-objetos-oop-con-javascript-c232l/)
es bastante completo también.  
