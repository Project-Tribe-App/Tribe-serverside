const userService = require("../services/user-service");
const Response = require("../utils/response");
exports.register = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      phoneNumber,
      city,
      state,
      country,
    } = req.body;

    const response = await userService.registerUser(
      name,
      username,
      email,
      password,
      phoneNumber,
      city,
      state,
      country
    );

    console.log(response);

    if (response) {
      return Response.success(res, "User registered successfully");
    }
    else {
      return Response.badRequest(res, "User registration failed");
    }
  } catch (error) {
    if (
      error.message === "Email is already registered" ||
      error.message === "Username is already taken"
    ) {
      return Response.conflict(res, error.message); // Conflict status code
    }
    console.error(error);
    return Response.error(res, "Internal server error");

  }
};
exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return Response.badRequest(res, "Username is required");
    }
    const profile = await userService.getProfile(username);
    if (!profile) {
      return Response.notFound(res, "User not found");
    } else {
      return Response.success(res, profile);

    }
  } catch (error) {
    console.error(error);
    return Response.error(res, "Internal server error");

  }
};

exports.updateUser = async function patchResource(req, res) {
  // update user Controller
  const { username } = req.params;
  const updateData = req.body;

  try {
    await userService.updateUser(username, updateData);
    return Response.success(res, "User updated successfully");
  } catch (error) {
    // Ensure you check for the error message correctly
    if (error.message === "User not found") {
      return Response.notFound(res, error.message);
    }
    // This catch block should correctly reference res
    console.error(error);
    return Response.error(res, "Internal server error");

  }
};

//check username
// Function to check if a username exists
exports.checkUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required.' });
  }

  try {
      // Search for the username in the database
      const userExists = await User.findOne({ username });

      if (userExists) {
          return res.status(200).json({ success: true, message: 'Username exists.' });
      } else {
          return res.status(404).json({ success: false, message: 'Username not found.' });
      }
  } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error.', error });
  }
};

