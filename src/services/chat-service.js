const { chatRoom } = require("../models/chat-model");
const User = require("../models/user-model");
const { v4: uuidv4 } = require("uuid");

class ChatService {
  static async joinChatRoom(username, roomId) {
    try {
      const room = await chatRoom.findOne({ roomId });
      if (!room) {
        return new Error("Room not found");
      }
      const adminId = room.adminId;
      if (room.members.includes(username)) {
        return new Error("User already added to the room");
      }
      if (username !== adminId) {
        const user = await User.findOneAndUpdate(
          { username },
          { $addToSet: { squads: roomId } }
        );
        if (!user) {
          return new Error("User not found");
        }
        await chatRoom.findOneAndUpdate(
          { roomId },
          { $addToSet: { members: username } }
        );
        return true;
      } else {
        return new Error("Group administrator cannot join the group explicitly");
      }
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
      const adminId = room.adminId;
      if (!room.members.includes(username)) {
        return new Error("User already left the room");
      }
      if (username !== adminId) {
        const user = await User.findOneAndUpdate(
          { username },
          { $pull: { squads: roomId } }
        );
        if (!user) {
          return new Error("User not found");
        }
        await chatRoom.findOneAndUpdate(
          { roomId },
          { $pull: { members: username } }
        );
      } else {
        const newAdmin = await chatRoom.findOne({ roomId });
        if (!newAdmin) {
          return new Error("No members available to assign as admin");
        }
        const nextAdminId = newAdmin.members[0];
        await User.findOneAndUpdate(
          { username },
          { $pull: { squads: roomId } }
        );
        await chatRoom.findOneAndUpdate(
          { roomId },
          { $pull: { members: username }, $set: { adminId: nextAdminId } }
        );
      }
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async createRoom(squadName, squadProfilePicture, description, adminId) {
    try {
      const roomId = uuidv4();
      const createRoom = new chatRoom({
        squadName,
        squadProfilePicture,
        description,
        roomId,
        adminId,
      });
      return await createRoom.save();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = ChatService;