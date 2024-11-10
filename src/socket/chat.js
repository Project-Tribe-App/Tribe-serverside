const { Server } = require("socket.io");
const chatService = require("./chat-service");

let io;

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

  // Initialize the chat namespace
  chatService(io.of("/chat"));
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { initializeSocket, getIO };