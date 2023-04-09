require("dotenv").config();

const express = require("express");

const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");

const app = express.Router();

// Retrieve the total number of users.
app.get("/users", async (req, res) => {
	try {
		const count = await UserModel.countDocuments();
		return res.status(201).send({ count });
	} catch (e) {
		return res.status(400).send(e);
	}
});

// Retrieve the top 5 most active users, based on the number of posts
app.get("/users/top-active", async (req, res) => {
	try {
	} catch (e) {
		return res.status(400).send(e);
	}
});

module.exports = app;
