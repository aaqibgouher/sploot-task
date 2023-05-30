const mongoose = require("mongoose");

// user schema with name, email, password and age
const userSchema = new mongoose.Schema({
  name: {
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
  age: {
    type: String,
    default: "",
  },
});

// users is the collection
const UserModel = mongoose.model("UserModel", userSchema, "users");

// exporting model
module.exports = UserModel;
