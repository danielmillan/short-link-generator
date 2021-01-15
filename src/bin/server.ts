import debugLib from 'debug';
import http from 'http';
import app from '../app';
import config from '../config';

const debug = debugLib('link:server');

function setPort(val: string) {
    const nPort = parseInt(val, 10);
    if (isNaN(nPort)) {
        return val;
    }
    if (nPort >= 0) {
        return nPort;
    }
    return false;
}

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${(addr as any).port}`;
    debug(`Listening on ${bind}`);
}

const port = setPort(config.port);
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

export default server;
