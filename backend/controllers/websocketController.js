const WebSocket = require('ws');

var clients = []

const wss = new WebSocket.Server({
    port: process.env.WS_PORT || '3001'
});

wss.on('connection', (ws, req) => {
    const ip = req.connection.remoteAddress;
    console.log("WS connection with: ", ip);
    
    ws.on('message', (m) => {
        ws.send("Received: " + m);
        // wss.listeners().forEach(x => {
        //     console.log("Listener: ", x);
        //     x.send("Message: " + m);
        // })
    })
})