const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

// Set up routes, middleware, and socket.io event handling here

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let arr = []
let playingArray = []

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on("find", (e) => {
        console.log(e)

    })
    // Define socket.io event handlers here
  
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
  