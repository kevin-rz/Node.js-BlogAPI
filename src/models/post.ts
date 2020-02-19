import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tittle: String,
    date: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    totalComments: Number,
    content: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
    }]
})

const Post = mongoose.model('Post', postSchema)

export default Post