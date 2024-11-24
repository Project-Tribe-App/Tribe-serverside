const { chatRoom } = require("../models/chat-model")
const User = require("../models/user-model")
const { chatRoom } = require("../models/chat-model");
const { v4: uuidv4 } = require("uuid");

class ChatService {
    static async joinChatRoom(userId, roomId) {
        try {
            let user = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { squads: roomId } }
            );
            if (!user) {
                return new Error("User not found ")
            }
            return true;
        }
        catch (err) {
            throw err;
        }
    }
    static async getAllRooms(userId) {
        try {
            let user = await User.findOne(
                { _id: userId },
            );
            if (!user) {
                return new Error("User not found ")
            }
            return user.squads;
        }
        catch (err) {
            throw err;
        }

    }
    static async leaveChatRoom(userId, roomId) {
        try {
            let user = await User.findOneAndUpdate(
                { _id: userId },
                { $pop: { squads: roomId } }
            );
            if (!user) {
                return new Error("User not found ")
            }
            return true;
        }
        catch (err) {
            throw err;
        }
    }
    static async createRoom(
        squadName,
        squadProfilePicture,
        description,
    ) {
        try {
            const roomId = uuidv4();
            const createRoom = new chatRoom({
                squadName,
                squadProfilePicture,
                description,
                roomId
            });
            return await createRoom.save();
        } catch (err) {
            throw err;

        }
    }


}
module.exports = ChatService