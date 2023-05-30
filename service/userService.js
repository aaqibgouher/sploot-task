const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

// add user method
const addUser = async (name, email, password) => {
  //   validations
  if (!name || !name.trim()) throw "Name is required.";
  if (!email || !email.trim()) throw "Name is required.";
  if (!(await isValidEmail(email))) throw "Valid Email is required";
  if (!password || !password.trim()) throw "Name is required.";

  // get user by email
  let user = await getUserByEmail(email);

  // if user exists, show error
  if (user) throw "Email already exists.";

  // else add
  let userObj = new UserModel({
    name,
    email,
    password: await hashPassword(password),
    age: 0,
  });

  // save data
  await userObj.save();

  // return user id
  return userObj._id;
};

// get user by email
const getUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

// get user by id
const getUserById = async (userId) => {
  return await UserModel.findById(userId).select("-password");
};

// update user by id
const updateUserById = async (userId, params) => {
  // user by id
  let user = await getUserById(userId);

  // if not found, show error
  if (!user) throw "User id is invalid";

  // else, if name and age exists, changing user
  if ("name" in params && params.name) {
    user.name = params.name;
  }

  if ("age" in params && params.age) {
    user.age = params.age;
  }

  // save
  await user.save();

  // returnig user
  return user;
};

// hash password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// compare password by taking entered password, and original password
const comparePassword = async (password, userPassword) => {
  const match = await bcrypt.compare(password, userPassword);

  if (match) return true;
  else return false;
};

// validate email
const isValidEmail = async (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  addUser,
  isValidEmail,
  getUserByEmail,
  hashPassword,
  comparePassword,
  getUserById,
  updateUserById,
};
