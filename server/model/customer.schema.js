 const mongoose = require("mongoose")

 const customerSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, "Please provide a name"],  

    },
    email: {
        type: String,
        required: [true, "Please provide a email"],     
    },

    password: { 
        type: String,
        required: [true, "Please provide a password"],

    },
 })

 const Customer = mongoose.models.customers || mongoose.model("customers", customerSchema)
 module.exports = Customer