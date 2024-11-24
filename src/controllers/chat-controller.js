const Response = require("../utils/response");
exports.joinChatRoom = async (req, res) => {

  try {
    const { userId, roomId } = req.body;
    let response = await roomService.joinChatRoom(userId, roomId);
    if (response.message==="User not found"){
      return Response.unauthorized(res, "User not found");
      
    }
    else {
      return Response.success(res, "User has joined room successfully");
    }

  }
  catch (error) {
    return Response.error(res, "server error")
  }
}
exports.getAllChatRooms = async (req, res) => {
  try {
    const { userId} = req.body;
    let response = await roomService.getAllChatRooms(userId);
    if (response.message==="User not found"){
      return Response.unauthorized(res, "User not found");
      
    }
    else {
      return res.status(200).json({status:200,message:response});
    }

  }
  catch (error) {
    return Response.error(res, "server error")
  }
}
exports.leaveChatRoom = async (req, res) => {
  try {
    const { userId, roomId } = req.body;
    let response = await roomService.leaveChatRoom(userId, roomId);
    if (response.message==="User not found"){
      return Response.unauthorized(res, "User not found");
      
    }
    else {
      return Response.success(res, "User has left room successfully");
    }
  }
  catch (error) {
    return Response.error(res, "server error")
  }
}
exports.createRoom = async (req, res) => {
  try {
    let {
      squadName,
      squadProfilePicture,
      description,
      } = req.body;
    let response = chatService.createRoom(squadName, squadProfilePicture, description);
    if (response) {
      return Response.success(res, "Squad created successfully");
    }
  } catch (error) {
    return Response.badRequest(res, "Squad creation failed");
  }
}