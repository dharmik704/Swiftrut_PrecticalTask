const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project",
		required: true,
	},
	amount:{
		type: Number,
		required: true,
	},
    currency:{
		type: String,
		required: true,
	},
	
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
