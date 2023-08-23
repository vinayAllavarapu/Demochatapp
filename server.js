const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname)); // Serve static files from the current directory

// Handle connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle user joined event
  socket.on('user joined', (userName) => {
    console.log(`User ${userName} joined the chat`);
  });

  // Handle chat message event
  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
