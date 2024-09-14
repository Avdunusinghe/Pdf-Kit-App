const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},

	phoneNumber: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	address: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},
});

module.exports = User = mongoose.model("User", userSchema);
