const { timeStamp } = require('console');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
    favourites: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Properties",
    },
	bookings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Properties",
    },
},
{timeStamp: true},
);

const User = mongoose.model("User", userSchema);

module.exports = User;
