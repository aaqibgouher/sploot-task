const userService = require("./userService");
const JWTLibrary = require("../utils/JWTLibrary");

// register method
const register = async (name, email, password) => {
  // add user and returns user id
  const userId = await userService.addUser(name, email, password);

  // login user
  const user = await login(email, password);

  return user;
};

// login method
const login = async (email, password) => {
  // validations
  if (!email || !email.trim()) throw "Email is required.";
  if (!(await userService.isValidEmail(email))) throw "Valid Email is required";
  if (!password || !password.trim()) throw "Password is required.";

  // get user by email
  let user = await userService.getUserByEmail(email);

  // if user not found, show error
  if (!user) throw "Email does not exists.";

  // else check password
  if (!(await userService.comparePassword(password, user.password)))
    throw "Email/Password is invalid.";

  // generate token by user id
  let token = await JWTLibrary.generateToken({ userId: user._id });

  // returning obj
  return {
    userId: user._id,
    email,
    token,
  };
};

module.exports = {
  register,
  login,
};
