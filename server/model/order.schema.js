const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true],

    },
    address: {
        type: String,
        required: [true],

    },
    contact: {
        type: Number,
        required: [true],

    },
    totalAmount: {
        type: Number,

    },
    userId: {
        type: String,

    },

})

const Order = mongoose.models.order || mongoose.model("order", orderSchema)
module.exports = Order
