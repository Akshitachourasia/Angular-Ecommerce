const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide a name"],
        
    },


    category: {
        type: String,
        required: [true, "Please provide a category"],

    },
    color: {
        type: String,
        required: [true, "Please provide a color"],

    },

    price: {
        type: String,
        required: [true, "Please provide a price"],

    },

    image: {
        type: String,
        required: [true, "Please provide a image"],

    },

    description: {
        type: String,
        required: [true, "Please provide a description"],

    },

})

const Product = mongoose.models.products || mongoose.model("products", productSchema)
module.exports = Product