Glosario
--------

## API 

*Application programming interface*, conjunto de órdenes que se usan
para interactuar con una aplicación a través de la llamada a una serie
de funciones. En un interfaz RESTful las llamadas a
funciones son URLs a las que se les puede pasar, de forma adicional,
parámetros en forma de estructuras de datos codificadas, generalmente,
en JSON o XML y que se recibirán por entrada estándar al modo
[CGI](#CGI).

## CGI 

En el contexto de la web, [CGI](http://www.w3.org/CGI/) significa
*Common Gateway Interface*, o interfaz de enlace común; es un método
para ejecutar programas desde un servidor web que consiste en codificar
las entradas al programa en entrada estándar (como si los leyera desde
teclado) y en variables de entorno (como si desde la línea de comandos
definiéramos una serie de variables) y entregar la salida por entrada
estándar. El servidor web ejecuta el programa, definiendo variables de
entorno y proporcionándole la entrada, y recibe la salida que envía al
quien ha solicitado el URL.

## HTTP 

[HTTP o Hypertext Transfer Protocol, protocolo de transferencia hipertexto](http://es.wikipedia.org/wiki/Http), es el protocolo usado en
toda la web y que rige la forma como se solicitan recursos a un servidor
web, cómo se sirven y cómo se indican errores sucedidos en el mismo.
Durante mucho tiempo, el servidor web por excelencia ha sido
[Apache](http://httpd.apache.org), pero hoy en día es muy habitual la
creación de aplicaciones en torno a servidores HTTP integrados, como en
node.js o en entornos MVC como Django.

## PaaS 

[Platform as a Service, o Plataforma como Servicio](http://es.wikipedia.org/wiki/PaaS#Plataforma_como_servicio),
es un producto que integra una máquina virtual provisionada con una
serie de aplicaciones de tal forma que sólo hay que subir el código que
usa esa aplicación. Básicamente se trata de usar servicios en la nube
sin necesidad de instalar y configurar los programas necesarios. Estos
PaaS pueden ir desde lo más básico, una simple base de datos, hasta
integrar pilas completas de servicios que permitan desplegar, por
ejemplo, una aplicación node.js o Django.

## REST 

[REST](http://es.wikipedia.org/wiki/Representational_State_Transfer)
significa transferencia de estado que representa algo (por no traducir
representacional, que suena fatal). Es una convención para el diseño de
APIs que consiste en usar los verbos del protocolo HTTP
y su significado estricto para llevar a cabo todas las operaciones de un
programa.

## RESTful 

API diseñada siguiendo las convenciones REST.
