const Response = require("../utils/response");
const chatService = require("../services/chat-service");

exports.getSquadProfile = async (req, res) => {
  try {
    const { roomId } = req.params;
    const squadProfile = await chatService.fetchSquadProfile(roomId);

    res.json({ status: true, message: "Squad profile fetched successfully", data: squadProfile });
  } catch (error) {
    console.error("Error in getSquadProfile:", error.message);
    return Response.error(res, error.message || "An error occurred");
  }
};

exports.joinSquad = async (req, res) => {
  try {
    const { roomId, username } = req.body;
    const response = await chatService.joinSquad(username, roomId);

    if (response instanceof Error) {
      switch (response.message) {
        case "User not found":
          return Response.unauthorized(res, "User not found");
        case "Squad not found":
          return Response.notFound(res, "Squad not found");
        case "User already added to the squad":
          return Response.badRequest(res, "User already added to the squad");
        case "Group administrator cannot join the squad explicitly":
          return Response.badRequest(res, "Group administrator cannot join the squad explicitly");
        default:
          return Response.error(res, "Unexpected error occurred");
      }
    }

    return Response.success(res, "User has joined squad successfully");
  } catch (error) {
    console.error("Error in joinSquad:", error.message);
    return Response.error(res, error.message || "Server error");
  }
};

exports.getAllSquads = async (req, res) => {
  try {
    const { username } = req.body;
    const response = await chatService.getAllSquads(username);

    if (response instanceof Error && response.message === "User not found") {
      return Response.unauthorized(res, "User not found");
    }

    res.json({ status: true, message: "Squads fetched successfully", data: response });
  } catch (error) {
    console.error("Error in getAllSquads:", error.message);
    return Response.error(res, error.message || "Server error");
  }
};

exports.leaveSquad = async (req, res) => {
  try {
    const { username, roomId } = req.body;
    const response = await chatService.leaveSquad(username, roomId);
    if (response instanceof Error) {
      switch (response.message) {
        case "User not found":
          return Response.unauthorized(res, "User not found");
        case "Squad not found":
          return Response.notFound(res, "Squad not found");
        case "User already left the squad":
          return Response.badRequest(res, "User already left the squad");
        case "Admin cannot leave as there are no other members to assign as admin":
          return Response.badRequest(res, "Admin cannot leave as there are no other members to assign as admin");
        default:
          return Response.error(res, "Unexpected error occurred");
      }
    }

    return Response.success(res, "User has left squad successfully", response);
  } catch (error) {
    console.error("Error in leaveSquad:", error.message);
    return Response.error(res, error.message || "Server error");
  }
};

exports.createSquad = async (req, res) => {
  try {
    const { squadName, squadProfilePicture, description, adminName, adminUserName } = req.body;
    const response = await chatService.createSquad(squadName, squadProfilePicture, description, adminName, adminUserName);

    if (response instanceof Error) {
      switch (response.message) {
        case "Squad is already created by this admin":
          return Response.badRequest(res, "Squad is already created by this admin");
        default:
          return Response.error(res, "Unexpected error occurred");
      }
    }

    res.json({ status: true, message: "Squad created successfully", data: response });
  } catch (error) {
    console.error("Error in createSquad:", error.message);
    return Response.badRequest(res, "Squad creation failed");
  }
};
