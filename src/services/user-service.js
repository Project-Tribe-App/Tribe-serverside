const Usermodel = require("../models/user-model");

class UserService {
  static async registerUser(
    name,
    username,
    email,
    password,
    phoneNumber,
    city,
    state,
    country
  ) {
    try {
      const createUser = new Usermodel({
        name,
        username,
        email,
        password,
        phoneNumber,
        city,
        state,
        country,
      });
      return await createUser.save();
    } catch (err) {
      // Check for duplicate key error
      if (err.code === 11000) {
        // Duplicate key error, send a more descriptive message
        if (err.keyPattern.email) {
          throw new Error("Email is already registered");
        }
        if (err.keyPattern.username) {
          throw new Error("Username is already taken");
        }
      }
      throw err;
    }
  }
  static async getProfile(username) {
    try {
      const profile = await Usermodel.findOne({ username: username }).select('name username email phoneNumber city state country'); // exclude password from the response
      return profile;
    } catch (err) {
      throw err;
    }
  }

  static async updateUser(username, updateData) {
    //update service
    try {
      const updatedUser = await Usermodel.findOneAndUpdate(
        { username }, // Find by ID
        updateData, // Data to update
        { new: true, runValidators: true } // Options
      ).select('name username email phoneNumber city state country');

      if (!updatedUser) {
        throw new Error("Resource not found");
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;