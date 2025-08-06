import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        author : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content : {
            type: String,
        },
    }, {timestamps: true,}
);

const Post = mongoose.model("Post", postSchema);

export default Post;