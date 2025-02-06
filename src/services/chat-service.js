const { chatRoom } = require("../models/chat-model");
const User = require("../models/user-model");
const { v4: uuidv4 } = require("uuid");

class ChatService {
  static async fetchSquadProfile(roomId) {
    if (!roomId) {
      throw new Error("Squad ID is required.");
    }
    const room = await chatRoom.findOne({ roomId });
    if (!room) {
      throw new Error("Squad not found.");
    }
    return {
      squadName: room.squadName,
      squadProfilePicture: room.squadProfilePicture,
      description: room.description,
      adminId: room.adminId,
      members: room.members,
    };
  }

  static async joinSquad(username, roomId) {
    try {
      const squad = await chatRoom.findOne({ roomId });
      if (!squad) {
        return new Error("Squad not found");
      }
      if (squad.members.some(member => member.username === username)) {
        return new Error("User already added to the squad");
      }
      if (username === squad.adminId) {
        return new Error("Group administrator cannot join the squad explicitly");
      }

      const user = await User.findOneAndUpdate(
        { username },
        {
          $addToSet: {
            squads: {
              squadName: squad.squadName,
              squadProfilePicture: squad.squadProfilePicture,
              membersCount: squad.members.length + 1,
            },
          },
        },
        { new: true }
      );
      if (!user) {
        return new Error("User not found");
      }

      await chatRoom.findOneAndUpdate(
        { roomId },
        {
          $addToSet: {
            members: {
              name: user.name,
              username: user.username,
            },
          }
        }
      );
      return squad;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getAllSquads(username) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return new Error("User not found");
      }
      return user.squads;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async leaveSquad(username, roomId) {
    try {
      const squad = await chatRoom.findOne({ roomId });
      if (!squad) {
        return new Error("Squad not found");
      }
      if (!squad.members.some(member => member.username === username)) {
        return new Error("User already left the squad");
      }
      if (username === squad.adminId) {
        if (squad.members.length <= 1) {
          return new Error("Admin cannot leave as there are no other members to assign as admin");
        }
        const nextAdmin = squad.members.find(member => member.username !== squad.adminId);
        if (!nextAdmin) {
          return new Error("No members available to assign as admin");
        }
        await chatRoom.findOneAndUpdate(
          { roomId },
          {
            $pull: { members: { username } },
            $set: { adminId: nextAdmin.username },
          }
        );
      } else {
        await chatRoom.findOneAndUpdate(
          { roomId },
          { $pull: { members: { username } } }
        );
      }
      await User.findOneAndUpdate(
        { username },
        { $pull: { squads: { squadName: squad.squadName } } }
      );
      return squad;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async createSquad(squadName, squadProfilePicture, description, adminName,adminUserName) {
    try {
      let adminId=adminUserName
      const roomId = uuidv4();
      const existingSquad = await chatRoom.findOne({ squadName, adminUserName });
      if (existingSquad) {
        return new Error("Squad is already created by this admin");
      }
  
      const newSquad = new chatRoom({
        squadName,
        squadProfilePicture,
        description,
        roomId,
        adminId,
        members: [{ name: adminName, username: adminId }],
      });
  
      await newSquad.save();
      await User.findOneAndUpdate(
        { username: adminId},
        {
          $addToSet: {
            squads: {
              squadName: newSquad.squadName,
              squadProfilePicture: newSquad.squadProfilePicture,
              membersCount: newSquad.members.length,
            },
          },
        }
      );
  
      return {
        squadName: newSquad.squadName,
        squadProfilePicture: newSquad.squadProfilePicture,
        description: newSquad.description,
        roomId: newSquad.roomId,
        adminId: newSquad.adminId,
        members: newSquad.members,
      };
    } catch (err) {
      console.error("Error in createSquad:", err.message);
      throw new Error("Failed to create squad. Please try again later.");
    }
  }
}

module.exports = ChatService;
