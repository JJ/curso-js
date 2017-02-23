/* jshint esversion: 6 */

const http = require('http');

const createServer = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Ahí estamos ' + req.url);
};

http.createServer(createServer).listen(8081, '127.0.0.1');

console.log('Servidor ejecutándose en http://127.0.0.1:8081/');