require("dotenv").config();

const express = require("express");

const PostModel = require("../models/post.model");

const app = express.Router();

// Retrieve a post by id.
app.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const post = await PostModel.findById(id);
		return res.status(201).send(post);
	} catch (e) {
		return res.status(400).send(e);
	}
});
// Retrieve all posts
app.get("/", async (req, res) => {
	try {
		const post = await PostModel.aggregate([
			{ $sort: { timestamps: 1 } },
			{
				$lookup: {
					from: "users",
					localField: "user_id",
					foreignField: "_id",
					as: "user",
				},
			},
		]);
		return res.status(201).send(post);
	} catch (e) {
		return res.status(400).send(e);
	}
});

// Create a new post.
app.post("/", async (req, res) => {
	let { content, user_id } = req.body;

	try {
		let newPost = new PostModel({ content, user_id });
		await newPost.save();
		return res.status(201).send(newPost);
	} catch (e) {
		return res.status(500).send(e.message);
	}
});

// Update a post's content by id.
app.put("/:id", async (req, res) => {
	const { content } = req.body;
	const { id } = req.params;

	try {
		await PostModel.findByIdAndUpdate(id, { $set: { content } }, { new: true });
		return res.status(200).send({
			message: "Post updated successfully!",
		});
	} catch (e) {
		return res.status(401).send(e);
	}
});

// Delete a post by id.
app.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await PostModel.findByIdAndDelete(id);
		return res.status(200).send({
			message: "Post deleted successfully!",
		});
	} catch (e) {
		return res.status(401).send(e);
	}
});

// Increment the like count of a post by id.
app.post("/:id/like", async (req, res) => {
	const { id } = req.params;
	const { likedBy } = req.body;
	try {
		const post = await PostModel.findById(id);
		await PostModel.findByIdAndUpdate(
			id,
			{ $set: { likes: post.likes + 1, likedBy: [...post.likedBy, likedBy] } },
			{ new: true }
		);
		return res.status(200).send({
			message: "Like incremented successfully!",
		});
	} catch (e) {
		return res.status(401).send(e);
	}
});

// Decrement the like count of a post by id. The count should not go below 0.
app.post("/:id/unlike", async (req, res) => {
	const { likedBy } = req.body;
	const { id } = req.params;
	try {
		const post = await PostModel.findById(id);
		if (post.likes > 0 || post.likedBy.includes(likedBy)) {
			let filterLikedBy = post.likedBy.filter((ele) => ele != likedBy);
			await PostModel.findByIdAndUpdate(
				id,
				{ $set: { likes: post.likes - 1, likedBy: filterLikedBy } },
				{ new: true }
			);
			return res.status(200).send({
				message: "Like decremented successfully!",
			});
		} else {
			return res.status(200).send({
				message: "Cannot decrement",
			});
		}
	} catch (e) {
		return res.status(401).send(e);
	}
});

module.exports = app;
