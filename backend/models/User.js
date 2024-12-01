const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    posts: {
        type: [String],
        default: [],
    },
    profilePic: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: "no one cared who i am until i put on the mask",
    },
    following: {
        type: [String],
        default: [],

    },
    followers: {
        type: [String],
        default: [],
    },

})
module.exports = mongoose.model("User",UserSchema);