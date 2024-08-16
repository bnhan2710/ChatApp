const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');
require('dotenv').config();
const socketController = require('./controllers/socket.controller');
const route = require('./routes/index');
const { ExpressPeerServer } = require('peer'); 

//Create server
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const peerServer = ExpressPeerServer(server, {
    debug: true
});

app.use('/peerjs', peerServer); 

// Connect to the database
require('./configs/database.connect')();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Socket controller
socketController(io);

// Routes
route(app);

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
