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
		// db.zips.aggregate([
		// 	{ $group: { _id: "$state", total: { $sum: "$pop" } } },
		// 	{ $sort: { total: 1 } },
		// ]);

		const topActive = await PostModel.aggregate([
			{
				$group: { _id: "$user_id", count: { $count: {} } },
			},
			{ $sort: { count: -1 } },
			{ $limit: 5 },
			{
				$lookup: {
					from: "users",
					localField: "_id",
					foreignField: "_id",
					as: "user",
				},
			},
		]);

		return res.status(201).send(topActive);
	} catch (e) {
		return res.status(400).send(e);
	}
});

module.exports = app;
