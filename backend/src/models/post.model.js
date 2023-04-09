const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
	{
		content: { type: String, required: true, min: 1, max: 300 },

		user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },

		likes: { type: Number, min: 0, default: 0 },

		likedBy: [{ type: Schema.Types.ObjectId, ref: "users" }],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const PostModel = model("posts", PostSchema);

module.exports = PostModel;
