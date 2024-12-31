const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth-middleware");
const chatController=require("../controllers/chat-controller")
//const ChatMessage = require('./chat-model');  // Import the renamed chat-model
router.post('/join-room', auth, chatController.joinChatRoom);
router.post('/leave-room', auth, chatController.leaveChatRoom);
router.get('/all-chat-rooms', auth, chatController.getAllChatRooms);
router.post("/create-room", auth,chatController.createRoom);
router.get("/fetch-room",auth,chatController.getRoomProfile);

module.exports = router;
