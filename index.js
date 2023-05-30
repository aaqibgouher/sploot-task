const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
// db configuration
require("./database/config");

// models
const UserModel = require("./models/UserModel");
const ArticleModel = require("./models/ArticleModel");

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// imported routes
const authRoutes = require("./routes/authRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const articleRoutes = require("./routes/articleRoutes");

// my routes
app.use("/api/", authRoutes);
app.use("/api/", userProfileRoutes);
app.use("/api/", articleRoutes);

// port
const PORT = process.env.PORT || 3000;

// listening port
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
