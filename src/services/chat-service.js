const { chatRoom } = require("../models/chat-model");
const User = require("../models/user-model");
const { v4: uuidv4 } = require("uuid");

class ChatService {
  static async fetchRoomProfile(roomId) {
    if (!roomId) {
      throw new Error("Room ID is required.");
    }
    const room = await chatRoom.findOne({ roomId });
    if (!room) {
      throw new Error("Room not found.");
    }
    return {
      squadName: room.squadName,
      squadProfilePicture: room.squadProfilePicture,
      description: room.description,
      adminId: room.adminId,
      members: room.members,
    };
  }

  static async joinChatRoom(username, roomId) {
    try {
      const room = await chatRoom.findOne({ roomId });
      if (!room) {
        return new Error("Room not found");
      }
      if (room.members.some(member => member.username === username)) {
        return new Error("User already added to the room");
      }
      if (username === room.adminId) {
        return new Error("Group administrator cannot join the group explicitly");
      }

      const user = await User.findOneAndUpdate(
        { username },
        {
          $addToSet: {
            squads: {
              squadName: room.squadName,
              squadProfilePicture: room.squadProfilePicture,
              membersCount: room.members.length + 1,
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
      return room;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getAllRooms(username) {
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

  static async leaveChatRoom(username, roomId) {
    try {
      const room = await chatRoom.findOne({ roomId });
      if (!room) {
        return new Error("Room not found");
      }
      if (!room.members.some(member => member.username === username)) {
        return new Error("User already left the room");
      }
      if (username === room.adminId) {
        if (room.members.length <= 1) {
          return new Error("Admin cannot leave as there are no other members to assign as admin");
        }
        const nextAdmin = room.members.find(member => member.username !== room.adminId);
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
        { $pull: { squads: { squadName: room.squadName } } }
      );
      return room;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async createRoom(squadName, squadProfilePicture, description, adminName,adminUserName) {
    try {
      let adminId=adminUserName
      const roomId = uuidv4();
      const existingRoom = await chatRoom.findOne({ squadName, adminUserName });
      if (existingRoom) {
        return new Error("Room is already created by this admin");
      }
  
      const newRoom = new chatRoom({
        squadName,
        squadProfilePicture,
        description,
        roomId,
        adminId,
        members: [{ name: adminName, username: adminId }],
      });
  
      await newRoom.save();
      await User.findOneAndUpdate(
        { username: adminId},
        {
          $addToSet: {
            squads: {
              squadName: newRoom.squadName,
              squadProfilePicture: newRoom.squadProfilePicture,
              membersCount: newRoom.members.length,
            },
          },
        }
      );
  
      return {
        squadName: newRoom.squadName,
        squadProfilePicture: newRoom.squadProfilePicture,
        description: newRoom.description,
        roomId: newRoom.roomId,
        adminId: newRoom.adminId,
        members: newRoom.members,
      };
    } catch (err) {
      console.error("Error in createRoom:", err.message);
      throw new Error("Failed to create room. Please try again later.");
    }
  }
}

module.exports = ChatService;
