const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth-middleware");
const chatController=require("../controllers/chat-controller")
//const ChatMessage = require('./chat-model');  // Import the renamed chat-model
router.post('/join-room', auth, chatController.joinSquad);
router.post('/leave-room', auth, chatController.leaveSquad);
router.get('/all-chat-rooms', auth, chatController.getAllSquads);
router.post("/create-room", auth,chatController.createSquad);
router.get('/fetch-room/:roomId',auth,chatController.getSquadProfile);

module.exports = router;
