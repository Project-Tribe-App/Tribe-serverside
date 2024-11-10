const { chatMessage, chatRoom } = require("./chat-model");
const { v4: uuidv4 } = require("uuid");

class RoomService {
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

module.exports = RoomService;
