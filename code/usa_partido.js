#!/usr/bin/node

var un_partido = require('./Un_Partido.js');

var este_partido = new un_partido.Un_Partido( 'este','otro','1');
console.log('Resultado ' + este_partido.toString());