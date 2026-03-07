const express = require('express');
const {createServer} = require('node:http');
const {join} = require('node:path');
const {Server} = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server); // creates a wrapper on top of my http server and allows us to use socket.io

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('connection established');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // emit the message to all the clients that are connected to the server
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});