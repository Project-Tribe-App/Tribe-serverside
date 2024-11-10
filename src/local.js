const app = require("./app");
const { initializeSocket } = require("./socket/chat"); // Import initializeSocket
const port = process.env.PORT || 3000;

// Initialize HTTP Server from Express
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Initialize Socket.io with the server instance
initializeSocket(server);