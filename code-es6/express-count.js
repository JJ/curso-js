/* jshint esversion: 6 */
'use strict';

const express = require('express'),
    app = express(),
    puerto = process.argv[2] ? process.argv[2] : 8080;

let contadores = [];

/* Funciones */
const getAll = (req, res) => res.send('Portada');

const putOne = (req, res) => {
    contadores[req.params.id] = 0;
    res.send({creado: req.params.id});
};

const getOne = (req, res) => res.send('{ ' + req.params.id + ': ' + contadores[req.params.id] + '}');

const postOne = (req, res) => {
    contadores[req.params.id]++;
    res.send('{ ' + req.params.id + ': ' + contadores[req.params.id] + '}');
};

/* Rutas */
app.get('/', getAll);
app.put('/contador/:id', putOne);
app.get('/contador/:id', getOne);
app.post('/contador/:id', postOne);

/* Puesta en marcha del servidor */
app.listen(puerto);
console.log('Server running at http://127.0.0.1:' + puerto + '/');