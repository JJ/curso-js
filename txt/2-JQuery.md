#JQuery, simplificando el uso de JavaScript 


##Objetivos de este capítulo

-   Entender los conceptos básicos de JQuery
-   Conocer recursos adicionales para ampliar conocimientos

## JQuery: Introducción 

[JQuery](http://jquery.com) es una biblioteca en JavaScript que está
diseñada principalmente para simplificar la creación de programas
incrustados en páginas web y
permitir crear interfaces ricos de usuario en las mismas. 
[JQuery](https://es.wikipedia.org/wiki/JQuery) se ha popularizado desde
su creación en el año 2006 hasta el punto que se calcula que ha
llegado a usarse en más de la mitad de los sitios más populares. En la
actualidad se sigue usando extensivamente, aunque hay otras
bibliotecas de más alto nivel que lo incluyen y que hacen su uso
transparente. 

Por supuesto, es software
libre con una [licencia MIT](http://en.wikipedia.org/wiki/MIT_License).
JQuery ha sido aceptado también e integrada por casi todas las grandes empresas
que crean herramientas de desarrollo de software e incluso Google aloja
directamente una copia de JQuery que se puede usar desde cualquier
programa.

A vista de pájaro, JQuery introduce un objeto, `$`, que permite acceder
a todas sus funciones.

>`$` es simplemente un identificador válido en JavaScript, igual que
>`_`. Su uso no es exclusivo de JQuery y lo puedes usar en tus
>programas si lo deseas. A veces `$` se usa seguido de forma inmediata
>por un paréntesis, y es que hay que recordar que los objetos en
>JavaScript son en realidad funciones. 

La primera función que se suele usar de JQuery es
[`ready`](https://api.jquery.com/ready/), que se activa cuando el DOM
está totalmente cargado. Es la primera que se suele llamar en
JQuery, cronológicamente hablando. Lo vemos  en el
[siguiente programa](https://github.com/JJ/curso-js/blob/master/code/ready.html):

~~~HTML
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-15">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<title>Probando ready de jQuery</title>
</head>

<body>
<h1>Esta es una página que no tiene gran cosa</h1>

<p>Pero podría tenerla.</p>
<script type='text/javascript'>
$(document).ready(function() {
    console.log('Ahora estamos listos');
});
</script>
<address></address>
<!-- hhmts start -->Last modified: Sun Apr  7 19:49:52 CEST 2013 <!-- hhmts end -->
</body> 
</html>
~~~

En este caso y en la quinta línea, usamos como se ha indicado antes la
[copia de JQuery proporcionada por Google](https://developers.google.com/speed/libraries/#jquery), que, como cualquier otra biblioteca JS, debe ser
incluida en nuestra página para ser usada. Conviene, por razones de
eficiencia pero también como buena práctica, usar estas CDNs, de las
que [hay un montón](https://jquery.com/download/), en vez de copiar
jQuery en nuestro propio repositorio.

>Nunca, de hecho, se debe copiar jQuery ni, para el caso, ninguna
>librería JS, en nuestro propio repositorio. La forma correcta de
>hacerlo es usando `bower` o `npm` para descargarse la librería
>durante el despliegue.

En este caso, además, incluimos la librería *minificada*, es decir,
reducida a su mínima expresión para que tarde menos en cargarse. La
versión que se usa cambiará con el tiempo; usamos una de las últimas
de la versión *major* 1, aunque ya está disponible la versión 2. En
este caso, por supuesto, se puede usar la versión 2, el objeto del que
se habla no ha cambiado en la nueva versión.


Por otro lado, la única función que usamos de JQuery está tras el párrafo: cuando el documento
está *listo* (`ready`), escribimos en la consola que estamos listos
usando `console.log`; si está la consola del desarrollador del
navegador abierta se verá ese mensaje.

>Conviene que tengas la consola de depuración abierta; en este
>ejercicio y en todos, para observar errores y poder depurar el DOM y
>otros elementos de la página.

Este script funciona
exactamente igual que como el que habíamos visto anteriormente en
[este ejemplo que no usaba JQuery](https://github.com/JJ/curso-js/blob/master/code/onload.html),
es decir, realiza una acción cuando la página está cargada. 

De hecho, se puede
[simplificar](https://github.com/JJ/curso-js/blob/master/code/ready-simple.html)
e incluso ahorrar la orden para pasar directamente a la función que
queremos que se active cuando se cargue la página.

~~~JavaScript
$(function() {
    console.log('Ahora estamos listos');
});
~~~

En este caso se llama a una función anónima (un *closure*). Otra
alternativa habría sido

~~~JavaScript
$().ready( function() {
    console.log('Ahora estamos listos');
});
~~~

que, a diferencia de la primera, obvia el uso del objeto
`document`; se eligirá una u otra simplemente por cuestiones de
legibilidad.

## Seleccionando contenido

JQuery también simplifica el uso de selectores para extraer elementos
del DOM, usando la misma sintaxis que hemos visto arriba:
`$("selector")` permite extraer una serie de elementos que cumplan esa
sintaxis que, como hemos visto más arriba, es la misma que se usa en las
CSS. Lo vemos en el [siguiente ejemplo](https://github.com/JJ/curso-js/blob/master/code/selectores.html)

~~~HTML
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-15">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<title>Probando ready de jQuery</title>
</head>

<body>
<h1>Esta es una página que no tiene gran cosa</h1>

<p>Pero podría tenerla.</p>
<script type='text/javascript'>
$(function() {
    var hachedoses ='';
    $("h2").each( function() {
        hachedoses += this.textContent + " - ";
    } );
    console.log(hachedoses);
    $("#cambiando").html( hachedoses ); 
});
</script>
<h2>Este es un H2</h2>

<h2>Este es otro H2</h2>

<H2>Y este, lo adivinaste, otro</H2>

<div id='cambiando' style='border:dashed'></div>
</body> 
</html>
~~~

En este ejemplo, primero se recorren los elementos `h2` pero en vez de
hacerse a partir de un bucle se usa directamente el objeto generado por
el selector y que aplica a cada uno de ellos una función anónima; en
este caso la función concatena a `hachedoses` el contenido en texto del
elemento. Usamos la escritura en la consola con `console.log` principalmente para que se vea el contenido
del `div` definido más abajo y vacío y posteriormente con el contenido que
se le añade en la última línea del script, que usa como selector el
equivalente a un elemento con el id `#cambiando`.

Conviene recordar que `console.log` se usa aquí principalmente por
cuestiones de depuración. En producción se debe tratar de evitar,
porque al usuario no le sirve de nada más que una cierta ralentización
por hacer una operación de entrada salida. 

## Bibliografía

La mejor bibliografía está en inglés:
[jQuery fundamentals](http://jqfundamentals.com/), por ejemplo, es un
libro
gratuito. [Arquitectura de la aplicación web](https://es.coursera.org/course/webapplications)
es un curso gratuito de Coursera que incluye una parte de jQuery.  
