import User from '../models/user'
import mongoose from 'mongoose'

const findUserByEmailAndPassword = async (email, password) => {
    return await User.findOne({email, password})
}

const findById = async (id) => {
    return await User.findById(id)
}

const saveUser = async (user) => {

const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email: user.email,
        password: user.password
    })

    return await newUser.save()
}

const deleteById = async (id) => {
    return await User.findByIdAndRemove(id)
}

const updateUser = async (id, user) => {
    const updateOps = {}
    for (const ops of user){
        updateOps[ops.propName] = ops.value
    }
    return await User.update({_id: id}, {$set: updateOps})
}

export default {
    findUserByEmailAndPassword,
    findById,
    saveUser,
    deleteById,
    updateUser
}