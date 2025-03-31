const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "password is necessary"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    squads: {
      type: [Object],
      default: [],
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// primary user detail schema

const userPrimarySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
);

// Hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Export the userPrimarySchema for use in other models
module.exports.userPrimarySchema = userPrimarySchema;
// Export the user model
module.exports = mongoose.model("User", userSchema);
