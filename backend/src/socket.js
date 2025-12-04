const { Server } = require('socket.io');
let io;

function initSocket(server) {
  io = new Server(server, {
    cors: { origin: process.env.FRONTEND_URL }
  });

  io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);
  });
}

function emit(event, payload) {
  if (!io) return;
  io.emit(event, payload);
}

module.exports = { initSocket, emit };