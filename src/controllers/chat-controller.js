const Response = require("../utils/response");
const chatService = require("../services/chat-service");
const { fetchRoomProfile } = require('../services/roomService');

exports.getRoomProfile = async (req, res) => {
  try {
    const { roomId } = req.params;
    const roomProfile = await fetchRoomProfile(roomId);

    return res.json({
      status:200,
      data: roomProfile,
    });
  } catch (error) {
    console.error("Error in getRoomProfile:", error.message);

    return res.json({
      status: 500,
      message: error.message || "An error occurred.",
    });
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
        case "Group administrator cannot join the group explicitly":
          return Response.badRequest(res, "Group administrator cannot join the group explicitly");
        default:
          return Response.error(res, "Unexpected error occurred");
      }
    }

    return Response.success(res, "User has joined room successfully");
  } catch (error) {
    console.log(error);
    return Response.error(res, "server error");
  }
};

exports.getAllChatRooms = async (req, res) => {
  try {
    const { username } = req.body;
    const response = await chatService.getAllRooms(username);

    if (response instanceof Error && response.message === "User not found") {
      return Response.unauthorized(res, "User not found");
    }

    return res.status(200).json({ status: 200, message: response });
  } catch (error) {
    console.log(error);
    return Response.error(res, "server error");
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
        default:
          return Response.error(res, "Unexpected error occurred");
      }
    }

    return Response.success(res, "User has left room successfully");
  } catch (error) {
    console.log(error);
    return Response.error(res, "server error");
  }
};

exports.createRoom = async (req, res) => {
  try {
    const { squadName, squadProfilePicture, description, adminId } = req.body;
    const response = await chatService.createRoom(squadName, squadProfilePicture, description, adminId);

    if (response) {
      return res.json({ status: 200, message: "Squad created successfully", data: response });
    }
  } catch (error) {
    console.log(error);
    return Response.badRequest(res, "Squad creation failed");
  }
};
