const ArticleModel = require("../models/ArticleModel");
const userService = require("./userService");

// add article by id method, taking id and params
const addArticleByUserId = async (userId, params) => {
  // get user by id
  let user = await userService.getUserById(userId);

  //   if user does not exist, show error
  if (!user) throw "User does not exists for this id.";

  //   creating object
  let articleObj = { userId };

  //   if title, or description is present, adding in obj
  if ("title" in params && params.title) articleObj.title = params.title;
  if ("description" in params && params.description)
    articleObj.description = params.description;

  // passing obj to model
  let article = new ArticleModel(articleObj);

  // save data
  await article.save();

  //   return article
  return article;
};

// get articles method
const getArticles = async () => {
  // returnig all articles with populatin users by userId
  return await ArticleModel.find().populate({
    path: "userId",
    select: "-password",
  });
};

module.exports = {
  addArticleByUserId,
  getArticles,
};
