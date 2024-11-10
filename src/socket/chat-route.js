const express = require("express");
const router = express.Router();
//const ChatMessage = require('./chat-model');  // Import the renamed chat-model
const Response = require("../utils/response");
const roomService = require("./room-service");

// POST /api/create-room
router.post("/create-room", (req, res) => {
  try {
    const {
      squadName,
      squadProfilePicture,
      description,

    } = req.body;
    const response = roomService.createRoom(squadName, squadProfilePicture, description);

    console.log(response);

    if(response){
      return Response.success(res,"Squad created successfully");
    }
  } catch (error) {
    return Response.badRequest(res,"Squad creation failed");
  }
});

module.exports = router;

