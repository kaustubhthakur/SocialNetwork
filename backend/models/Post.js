const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    votes: {
        type: [String],
        default: [],
    },
    userId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
},)
module.exports = mongoose.model("Post", PostSchema);