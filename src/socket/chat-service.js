const { chatModel, chatRoom } = require("./chat-model");


module.exports = (chatNamespace) => {
  // Handle connection to WebSocket chat namespace
  chatNamespace.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Handle joining a room by roomId
    socket.on("joinRoom", (roomId) => {
      if (true) {
        socket.join(roomId);
        console.log(`Client joined room ${roomId}`);
        socket.to(roomId).emit("notification", `${roomId} has joined the room.`);
      } else {
        socket.emit("error", "Incomplete room data.");
      }
    });

// Handling message event
    socket.on("message", (data) => {
      console.log("Received raw data:", data); // Log the entire data object for debugging

      // Check if data is a string (e.g., JSON string) and parse it if necessary
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (error) {
          console.error("Error parsing JSON data:", error);
          socket.emit("error", "Invalid data format.");
          return;
        }
      }

      const roomId = data.roomId;
      const message = data.message;
      const senderName = data.senderName;
      const senderId = data.senderId;

      if (roomId && message) { // this is not the final
        console.log(roomId);
        console.log(message);
        console.log(`Message from ${senderName} (${senderId}) in room ${roomId}: ${message}`);
        chatNamespace.to(roomId).emit("message", { id: socket.id, message });
      } else {
        socket.emit("error", "Room does not exist or data is incomplete.");
      }
    });


    // Handle leaving a room
    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
      console.log(`Client ${socket.id} left room ${roomId}`);
      socket.to(roomId).emit("notification", `${socket.id} left the room.`);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};