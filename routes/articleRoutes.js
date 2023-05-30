const express = require("express");
const router = express.Router();
const articleController = require("../controller/articleController");
const authMiddleware = require("../middleware/authMiddleware");

// articles routes, added middleware so that only authenticated user can able to see articles
router.get(
  "/articles",
  authMiddleware.isAuthenticate,
  articleController.getArticles
);

module.exports = router;
