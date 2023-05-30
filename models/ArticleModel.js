const mongoose = require("mongoose");

// article schema with userId, title, description
const articleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "UserModel",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// articles collection
const ArticleModel = mongoose.model("ArticleModel", articleSchema, "articles");

// exporting model
module.exports = ArticleModel;
