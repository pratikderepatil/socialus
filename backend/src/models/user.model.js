const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
	{
		name: { type: String, required: true },

		email: {
			type: String,
			unique: true,
			required: true,
		},

		password: { type: String, required: true },

		bio: { type: String, min: 0, max: 300 },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const UserModel = model("users", UserSchema);

module.exports = UserModel;
