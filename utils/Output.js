const express = require("express");

// success method for 200
const success = async (res, message = "", data = []) => {
  return await output(res, 200, message, data);
};

// error method for 400
const error = async (res, message = "") => {
  return await output(res, 400, message);
};

// main output function, which returns status, json
const output = async (res, status = 200, message = "", data = []) => {
  return res
    .status(status)
    .json({ statusCode: status, data, error: "", message });
};

module.exports = {
  success,
  output,
  error,
};
