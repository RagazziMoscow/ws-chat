const express = require('express');
const ws = require('ws');
const port = 8000;

const httpServer = new express();
const webSocketServer = new ws.Server({port: 3000});

httpServer.use('/client', express.static(__dirname + '/client'));

httpServer.get('/', (req, res) => {
	res.sendFile('index.html', {root: __dirname});
});


httpServer.listen(port, () => {
	console.log(`Server is listening to the port ${port}`);
})

webSocketServer.on('connection', (ws) => {
  ws.on('message', (data) => {
    // Broadcast to everyone else.
    webSocketServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(data);
      }
    });
  });
});