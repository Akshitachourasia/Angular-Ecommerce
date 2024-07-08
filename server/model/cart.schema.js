const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true],

    },
    price: {
        type: String,
        required: [true],
    },

    category: {
        type: String,
    },

    color: {
        type: String,
    },
    image: {
        type: String,
        required: [true],
    },

    description: {
        type: String,
        required: [true],
    },
    quantity: {
        type: Number,
    },
    productId: {
        type: String,
 
    },
    userId: {
        type: String,
      
    },

})

const Cart = mongoose.models.carts || mongoose.model("cart", cartSchema)
module.exports = Cart
