const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CommentSchema = new Schema({
    username: String,
    text: String,
    publishedDate: {
        type: Date,
        default: Date.now,
        auto: true,
    },
    postId: String,
});

var CommentModel = mongoose.model('Comment', CommentSchema);
module.exports = CommentModel;