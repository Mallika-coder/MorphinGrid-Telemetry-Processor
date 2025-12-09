// backend/socket.js (No change needed if you fix the .env file in Step 2)
const { Server } = require('socket.io');
let io;

function initSocket(server) {
  io = new Server(server, {
    cors: { 
        origin: process.env.FRONTEND_URL, // This now reads http://localhost:3000
        methods: ["GET", "POST"] // Good practice to include methods
    }
  });

  io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);
    // You should add an initial handshake or log event here
  });
}

function emit(event, payload) {
  if (!io) return;
  io.emit(event, payload);
}

module.exports = { initSocket, emit };