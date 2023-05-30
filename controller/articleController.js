const express = require("express");
const Output = require("../utils/Output");
const articleService = require("../service/articleService");

// get user profile method
const getArticles = async (req, res) => {
  try {
    // calling article service to fetch results
    let data = await articleService.getArticles();

    // returnig success, message, data
    return await Output.success(res, "Successfully get articles", data);
  } catch (e) {
    // else error
    console.log(e, "from get articles  controller");
    return await Output.error(res, e);
  }
};

// create article method
const addArticleByUserId = async (req, res) => {
  try {
    // taking userId from params, and title, desc from body
    let { userId } = req.params;
    let { title, description } = req.body;

    // creatting params
    let params = { title, description };

    // calling article service to add article for user
    let data = await articleService.addArticleByUserId(userId, params);

    // returning success, message, data
    return await Output.success(res, "Successfully added an article", data);
  } catch (e) {
    // else error
    console.log(e, "from add user article controller");
    return await Output.error(res, e);
  }
};

module.exports = {
  getArticles,
  addArticleByUserId,
};
