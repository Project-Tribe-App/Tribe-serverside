const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth-middleware");
//const ChatMessage = require('./chat-model');  // Import the renamed chat-model
router.post('/join-chat', auth, chatController.joinChatRoom);
router.post('/leave-chat', auth, chatController.leaveChatRoom);
router.get('/all-chat-rooms', auth, chatController.getAllChatRooms);
router.post("/create-room", chatController.createRoom);

module.exports = router;
