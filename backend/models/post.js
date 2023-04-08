const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: String,
    content: String,
    publishedDate: {
        type: Date,
        default: Date.now,
        auto: true,
    },
    username: String,
    rentRange: Number,
});

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;