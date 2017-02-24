/* jshint esversion: 6 */

const https = require('https'),
    state = process.argv[2] ? process.argv[2] : 'open',
    options = {
        host: 'api.github.com',
        path: 'https://api.github.com/repos/jj/curso-js/issues?state=' + state,
        method: 'GET',
        headers: {'user-agent': 'PruebaNode'}
    };


const parseFunction = (res) => {
    let datos_JSON_acc = '';

    res.setEncoding('utf8');
    res.on('data', (datos_JSON) => datos_JSON_acc += datos_JSON);
    res.on('end', () => {
        let datos = JSON.parse(datos_JSON_acc);
        if (Array.isArray(datos)) {
            for (let i = 0, len = datos.length; i < len; i++) {
                console.log('Issue: ' + datos[i].title + '\nUser: ' + datos[i].user.login + '\n');
            }
        } else {
            console.log('Issue: ' + datos.title + '\nUser: ' + datos.user.login + '\n');
        }
    });
};

const req = https.get(options, parseFunction);

req.end();
