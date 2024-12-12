const mongoose = require("mongoose");

//Notes Schema
const NoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
});

//User Schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [NoteSchema],
});

// Create and export the User model
module.exports = mongoose.model("User", UserSchema);