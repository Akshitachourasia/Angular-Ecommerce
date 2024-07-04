const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
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

const User = mongoose.models.users || mongoose.model("users", UserSchema)
module.exports = User