const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const path = require('path')
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, resp) => {
    resp.sendFile(path.resolve('index.html'));
});

app.use(express.static(path.resolve('assets')))
const users = {};
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('login', function(data){
        console.log('a user ' + data.userId + ' connected');
        users[socket.id] = data.userId;
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('disconnect', function(){
        console.log('user '+ users[socket.id] + ' disconnected');
        delete users[socket.id];
    });
});



server.listen(3000, () => {
    console.log('Started')
});



