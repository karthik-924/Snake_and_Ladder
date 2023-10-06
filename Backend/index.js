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
  transports: ['websocket', 'polling'],
});

app.use(cors());

// Set up routes, middleware, and socket.io event handling here

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let rooms = {}; // Stores active game rooms
console.log(rooms);

io.on("connection", (socket) => {
    // console.log(`Socket connected: ${socket.id}`);
    
  socket.on("createRoom", ({ roomCode, playerName, noofplayers }) => {
    if (!rooms[roomCode]) {
      rooms[roomCode] = { players: [], number: 0 };
    }
    
    const room = rooms[roomCode];
    room.players.push({ id: socket.id, name: playerName, position: 1 });
    room.number = noofplayers;
    socket.join(roomCode);
    console.log(`Player ${playerName} joined room ${roomCode}`);

    socket.emit("roomCreated", { roomCode, playerName });

    // Broadcast the updated player list to all players in the room
    io.to(roomCode).emit("playerList", rooms[roomCode].players, rooms[roomCode].number);
    
  });

  socket.on("joinRoom", ({ roomCode, playerName }) => {
    if (!rooms[roomCode]) {
      return;
    }
    
    const room = rooms[roomCode];
    const playerExists = room.players.some(player => player.name === playerName);
    if(!playerExists)
    room.players.push({ id: socket.id, name: playerName, position: 1 });
    socket.join(roomCode);
    console.log(`Player ${playerName} joined room ${roomCode}`);

    socket.emit("roomJoined", { roomCode, playerName });
    console.log(room.players.length===parseInt(room.number));
    if(room.players.length === parseInt(room.number)){
      io.to(roomCode).emit("startGame");
    }

    // Broadcast the updated player list to all players in the room
    io.to(roomCode).emit("playerList", rooms[roomCode].players, rooms[roomCode].number);
  });

  // Listen for updates from clients and broadcast them to others in the same room
  socket.on("updateGameState", ({ roomCode,players, position,turn,currentPlayerPosition, targetPosition,anotherchance }) => {
    console.log(players, position, turn, currentPlayerPosition, targetPosition, anotherchance);
    rooms[roomCode].position = position;
    io.to(roomCode).emit("gameStateUpdate",players, position,turn,currentPlayerPosition, targetPosition,anotherchance);
  });

  socket.on("disconnect", () => {
      // console.log(`Socket disconnected: ${socket.id}`);
    });
  });
  