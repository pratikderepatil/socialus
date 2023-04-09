require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");

const connect = require("./congif/db");
const PORT = process.env.PORT;

const userRouter = require("./routes/users.router");
const analyticsRouter = require("./routes/analytics.router");
const postsRouter = require("./routes/posts.router");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose.set("strictQuery", false);

app.use("/users", userRouter);
app.use("/analytics", analyticsRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
	res.send("Social Us");
});

app.listen(PORT, async () => {
	connect();
	console.log(`Listening at http://localhost:${PORT}`);
});
