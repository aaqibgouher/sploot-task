const express = require("express");
const router = express.Router();
const userProfileController = require("../controller/userProfileController");
const articleController = require("../controller/articleController");
const authMiddleware = require("../middleware/authMiddleware");

// routes for users, added middleware
// route to get user detail by id
router.get(
  "/users/",
  authMiddleware.isAuthenticate,
  userProfileController.getUserProfile
);

// route to update user detail by id
router.put(
  "/users/:userId",
  authMiddleware.isAuthenticate,
  userProfileController.updateUserProfile
);

// route to add article by id
router.post(
  "/users/:userId/articles",
  authMiddleware.isAuthenticate,
  articleController.addArticleByUserId
);

module.exports = router;
