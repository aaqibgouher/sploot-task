const express = require("express");
const Output = require("../utils/Output");
const authService = require("../service/authService");

// register method
const register = async (req, res) => {
  try {
    // extracted data from body
    const { name, email, password, confirmPassword } = req.body;

    // if password and confirm password does not match
    if (password != confirmPassword)
      throw "Password and Confirm password doesn't match.";

    // calling register service
    let data = await authService.register(name, email, password);

    // returing success output, message, data
    return await Output.success(res, "Successfully Sign up", data);
  } catch (e) {
    // else error
    console.log(e, "from register controller");
    return await Output.error(res, e);
  }
};

// login method
const login = async (req, res) => {
  try {
    // extracted data from body
    const { email, password } = req.body;

    // calling login service
    let data = await authService.login(email, password);

    // returning success output, message, data
    return await Output.success(res, "Successfully Login", data);
  } catch (e) {
    // else error
    console.log(e, "from login controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  register,
  login,
};
