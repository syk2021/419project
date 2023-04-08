const mongoose = require('mongoose')
const Schema = mongoose.Schema

var PostSchema = new Schema({
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

var PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;