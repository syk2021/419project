import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
    title: String,
    body: String,
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    user: {
        username: String,
    },
    rentRange: Number,
});

const Post = mongoose.model('Post', PostSchema);

export default Post;