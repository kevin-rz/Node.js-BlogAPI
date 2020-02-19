import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: {
        type: String,
        minlength: 5
    }
})

const User = mongoose.model('User', userSchema)

export default User