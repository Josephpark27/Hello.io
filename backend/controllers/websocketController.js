const WebSocket = require('ws');

var clients = []

const wss = new WebSocket.Server({
    port: process.env.WS_PORT || '3001'
});

wss.on('connection', (a, b) => {
    a.on('message', (m) => {
        wss.listeners().forEach(x => {
            console.log(x);
            x.send(m);
        })
    });
});