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
      unique: true, // Unique constraint for username
    },
    password: {
      type: String,
      required: [true, "password is necessary"],
    },
    email: {
      type: String,
      required: true,
      unique: true, // Unique constraint for email
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
    squads:{
      type: Array,
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

// Ensure unique index for username
userSchema.index({ username: 1 }, { unique: true });

// Hash password before saving user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create the model with the schema
module.exports = mongoose.model("User", userSchema);