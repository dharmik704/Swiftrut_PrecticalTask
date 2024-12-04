const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');

const propertySchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	}, 
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: null,
	},
    rating: {
		type: Number,
		default: 3.5,
	},
    location: {
        type: String,
		required: true,
    },
    price: {
        org: {
            type: Number,
		    required: true,
        },
        mrp: {
            type: Number,
		    required: true,
        },
        off: {
            type: Number,
		    required: false,
            default: 0,
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},
{timeStamp: true},
);

const Property = mongoose.model("Properties", propertySchema);

module.exports = Property;
