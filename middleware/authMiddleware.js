const Output = require("../utils/Output");
const JWTLibrary = require("../utils/JWTLibrary");
const userService = require("../service/userService");

// Authentication middleware
const isAuthenticate = async (req, res, next) => {
  try {
    // taking token
    const token = req.headers.authorization?.split(" ")[1];

    // if not present, show err
    if (!token) throw "Please login to continue.";

    // decoding token
    const decoded = await JWTLibrary.decodeToken(token);

    // if not decoded show err, or if decoded and user id is not there, show error
    if (!decoded || (decoded && !decoded.userId))
      throw "Something problem with JWT";

    // if decoded, data is present, check user present with id or not
    let user = await userService.getUserById(decoded.userId);

    if (!user)
      throw "User does not exists, Some issue with JWT, Please login once again.";

    // decoded user id and params user id should be same
    const userId = req.params.userId;
    if (userId && userId !== decoded.userId)
      throw "You are not allowed to use others id.";

    // if everyting correct, setting user detail to request, allowing them as an authorized user
    req.user = decoded;

    next();
  } catch (e) {
    // else error
    console.log(e, "from auth middleware");
    return await Output.error(res, e);
  }
};

module.exports = {
  isAuthenticate,
};
