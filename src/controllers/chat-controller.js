const Response = require("../utils/response");
const chatService = require("../services/chat-service");

exports.getRoomProfile = async (req, res) => {
  try {
    const { roomId } = req.params;
    const roomProfile = await chatService.fetchRoomProfile(roomId);

    return res.json({status:200,message:"Room profile fetched successfully", data:roomProfile});
  } catch (error) {
    console.error("Error in getRoomProfile:", error.message);
    return Response.error(res, error.message || "An error occurred");
  }
};

exports.joinChatRoom = async (req, res) => {
  try {
    const { roomId, username } = req.body;
    const response = await chatService.joinChatRoom(username, roomId);

    if (response instanceof Error) {
      switch (response.message) {
        case "User not found":
          return Response.unauthorized(res, "User not found");
        case "Room not found":
          return Response.notFound(res, "Room not found");
        case "User already added to the room":
          return Response.badRequest(res, "User already added to the room");
        case "Group administrator cannot join the group explicitly":
          return Response.badRequest(res, "Group administrator cannot join the group explicitly");
        default:
          return Response.error(res, "Unexpected error occurred");
      }
    }

    return Response.success(res, "User has joined room successfully");
  } catch (error) {
    console.error("Error in joinChatRoom:", error.message);
    return Response.error(res, error.message || "Server error");
  }
};

exports.getAllChatRooms = async (req, res) => {
  try {
    const { username } = req.body;
    const response = await chatService.getAllRooms(username);

    if (response instanceof Error && response.message === "User not found") {
      return Response.unauthorized(res, "User not found");
    }

    return res.json({status:200,message:"Chat rooms fetched successfully",data:response});
  } catch (error) {
    console.error("Error in getAllChatRooms:", error.message);
    return Response.error(res, error.message || "Server error");
  }
};

exports.leaveChatRoom = async (req, res) => {
  try {
    const { username, roomId } = req.body;
    const response = await chatService.leaveChatRoom(username, roomId);

    if (response instanceof Error) {
      switch (response.message) {
        case "User not found":
          return Response.unauthorized(res, "User not found");
        case "Room not found":
          return Response.notFound(res, "Room not found");
        case "User already left the room":
          return Response.badRequest(res, "User already left the room");
        case "Admin cannot leave as there are no other members to assign as admin":
          return Response.badRequest(res, "Admin cannot leave as there are no other members to assign as admin");
        default:
          return Response.error(res, "Unexpected error occurred");
      }
    }

    return Response.success(res, "User has left room successfully", response);
  } catch (error) {
    console.error("Error in leaveChatRoom:", error.message);
    return Response.error(res, error.message || "Server error");
  }
};

exports.createRoom = async (req, res) => {
  try {
    const { squadName, squadProfilePicture, description, adminId } = req.body;
    const response = await chatService.createRoom(squadName, squadProfilePicture, description, adminId);

    if (response instanceof Error) {
      switch (response.message) {
        case "Room is already created by this admin":
          return Response.badRequest(res, "Room is already created by this admin");
        default:
          return Response.error(res, "Unexpected error occurred");
      }
    }

    return res.json({status:200,message:"Squad created successfully",data:response});
  } catch (error) {
    console.error("Error in createRoom:", error.message);
    return Response.badRequest(res, "Squad creation failed");
  }
};
