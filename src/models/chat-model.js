const mongoose = require('mongoose');

// message schema
const chatModelSchema = new mongoose.Schema(
  {
    senderName: {type: String, required: true},
    senderId: { type: String, required: true },
    profilePicture: {type: String, required: true},
    message: { type: String, required: true },
    roomId: { type: String, required: true }, // This is the sessionId or roomId
    timestamp: { type: Date, default: Date.now },
  }
);

//squad schema
const chatRoomSchema = new mongoose.Schema(
  {
    squadName: {type: String, required: true},
    squadProfilePicture: {type: String, required: true},
    description: {type: String, required: true},
    roomId: {type: String, required: true},
    adminId:{type:String,required:true},
    members: [Object]
  }
)

// Export both models
const chatMessage = mongoose.model('ChatMessage', chatModelSchema);
const chatRoom = mongoose.model('ChatRooms', chatRoomSchema);

module.exports = { chatMessage, chatRoom };