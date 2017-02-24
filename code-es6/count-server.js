/* jshint esversion: 6 */
'use strict';

const fs = require('fs'),
    express = require('express'),
    app = express();

let contadores = [],
    portada = fs.readFileSync('sumar_formulario.html', 'utf8');

const getPortada = (req, res) => res.send(portada);

const getPage = (req, res) => {
    let js = fs.readFileSync(req.params.page);
    res.contentType('text/javascript');
    res.send(js);
};

const putContador = (req, res) => {
    contadores[req.params.id] = 0;
    res.send('Creado contador ' + req.params.id);
};

const postContador = (req, res) => {
    contadores[req.params.id]++;
    res.contentType('application/json');
    res.send({resultado: contadores[req.params.id]});
    console.log({post: contadores});
};

const getContador = (req, res) => {
    res.contentType('application/json');
    res.send({ resultado:  contadores[req.params.id]});
};

const getSuma = (req, res) => res.send({
    resultado: contadores[req.params.id1] + contadores[req.params.id2]
});

app.get('/', getPortada);
app.get('/js/:page', getPage);
app.put('/contador/:id', putContador);
app.post('/contador/:id', postContador);
app.get('/contador/:id', getContador);
app.get('/suma/:id1/:id2', getSuma);

app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');