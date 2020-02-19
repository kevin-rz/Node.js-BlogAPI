import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: String,
    date: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment