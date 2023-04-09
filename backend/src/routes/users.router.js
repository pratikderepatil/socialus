require("dotenv").config();

const express = require("express");

const UserModel = require("../models/user.model");

const app = express.Router();

// Retrieve a user by id.
app.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await UserModel.findById(id);
		return res.status(201).send(user);
	} catch (e) {
		return res.status(400).send(e);
	}
});

// Create a new user.
app.post("/", async (req, res) => {
	let { name, email, password, bio } = req.body;

	let user = await UserModel.findOne({ email });
	try {
		if (user) {
			return res
				.status(409)
				.send("This email is already in use try with other email.");
		}

		let newUser = new UserModel({ name, email, password, bio });
		await newUser.save();
		return res.status(201).send(newUser);
	} catch (e) {
		return res.status(500).send(e.message);
	}
});

// Login route
app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email, password });

	if (user) {
		return res.status(200).send({
			message: "Login Success",
			user: user.name,
			id: user._id,
		});
	} else {
		return res.status(401).send("invalid credentials");
	}
});

// Update a user's name or bio by id.
app.put("/:id", async (req, res) => {
	const { name, bio } = req.body;
	const { _id } = req.params;

	try {
		await UserModel.findByIdAndUpdate(
			_id,
			{ $set: { name, bio } },
			{ new: true }
		);
		return res.status(200).send({
			message: "User updated successfully!",
		});
	} catch (e) {
		return res.status(401).send(e);
	}
});

// Delete a user by id.
app.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await UserModel.findByIdAndDelete(id);
		return res.status(200).send({
			message: "User deleted successfully!",
		});
	} catch (e) {
		return res.status(401).send(e);
	}
});

module.exports = app;
