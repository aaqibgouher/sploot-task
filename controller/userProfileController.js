const express = require("express");
const Output = require("../utils/Output");
const userService = require("../service/userService");

// get user profile method
const getUserProfile = async (req, res) => {
  try {
    // taking user id from params
    let { userId } = req.user;

    // calling user service to get user  by id
    let data = await userService.getUserById(userId);

    // if false, throw error
    if (!data) throw "User Id is invalid.";

    // returnig success, message, data
    return await Output.success(res, "Successfully get user profile", data);
  } catch (e) {
    // else error
    console.log(e, "from user profil controller");
    return await Output.error(res, e);
  }
};

// update user profile method
const updateUserProfile = async (req, res) => {
  try {
    // taking userId from params, name and age from body
    let { userId } = req.params;
    let { name, age } = req.body;

    // creating params
    let params = { name, age };

    // calling service file to update profile by id
    let data = await userService.updateUserById(userId, params);

    // returnig success, message and data
    return await Output.success(res, "Successfully updated user profile", data);
  } catch (e) {
    // else error
    console.log(e, "from update user profil controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
