const Response = require("../utils/response");
const chatService = require("../services/chat-service")
exports.joinChatRoom = async (req, res) => {

  try {
    const { roomId, userId } = req.body;
    let response = await chatService.joinChatRoom(userId, roomId);
    if (response.message === "User not found") {
      return Response.unauthorized(res, "User not found");

    }
    else {
      return Response.success(res, "User has joined room successfully");
    }

  }
  catch (error) {
    console.log(error)
    return Response.error(res, "server error")
  }
}
exports.getAllChatRooms = async (req, res) => {
  try {
    const { userId } = req.body;
    let response = await chatService.getAllRooms(userId);
    if (response.message === "User not found") {
      return Response.unauthorized(res, "User not found");

    }
    else {
      return res.status(200).json({ status: 200, message: response });
    }

  }
  catch (error) {

    return Response.error(res, "server error")
  }
}
exports.leaveChatRoom = async (req, res) => {
  try {
    const { userId, roomId } = req.body;
    let response = await chatService.leaveChatRoom(userId, roomId);
    if (response.message === "User not found") {
      return Response.unauthorized(res, "User not found");

    }
    else {
      return Response.success(res, "User has left room successfully");
    }
  }
  catch (error) {
    console.log(error)
    return Response.error(res, "server error")
  }
}
exports.createRoom = async (req, res) => {
  try {
    let {
      squadName,
      squadProfilePicture,
      description,
      adminId
    } = req.body;
    let response = chatService.createRoom(squadName, squadProfilePicture, description, adminId);
    if (response) {
      return Response.success(res, "Squad created successfully");
    }
  } catch (error) {
    console.log(error)
    return Response.badRequest(res, "Squad creation failed");
  }
}