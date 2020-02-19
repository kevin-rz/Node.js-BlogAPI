import { Router } from 'express'
import jwt from 'jsonwebtoken'
import userRepository from '../repositories/userRepository'

export const userController = Router()

userController.post('/login', async(req, res) => {
    const {email, password} = req.body

    const user = await userRepository.findUserByEmailAndPassword(email, password)

    if(user){
        jwt.sign( {email} , 'super-key-super-secret' , (err, token) => {
            res.status(200).json({token, message: 'User found correctly'})
        } )
    }else{
        res.status(404).json({message: 'User not found'})
    }

})


const checkToken = (req, res, next) => {
    const token = req.headers['authorization']

    jwt.verify(token, 'super-key-super-secret', (err, data)=> {
        if(err){
            res.status(400).json({err})
        }else{
            next()
        }
    })

}

userController.post('/', async(req, res) => {

    const user = await userRepository.saveUser(req.body)
    
    if(user) {
        res.status(200).json({ userRegistered: user, message:"User created correctly" })
    }else{
        res.status(400).json({ err: 'Something is wrong with request' })
    }

})


userController.get('/:id', checkToken,  async (req, res) => {
    const id = req.params.id

    const user = await userRepository.findById(id)

    if(user){
        res.status(200).json({user: user})

    }else{
        res.status(404).json({ message: 'User not found' })
    }
})

userController.delete('/:id', checkToken,  async (req, res) => {
    const id = req.params.id

    const user = await userRepository.deleteById(id)

    if(user){
        res.status(200).json({message: 'User deleted corectly'})

    }else{
        res.status(404).json({ message: 'User not found' })
    }
})

userController.patch('/:id', checkToken,  async (req, res) => {
    const id = req.params.id
    const user = await userRepository.updateUser(id, req.body)

    if(user){
        res.status(200).json({message: 'User modified corectly'})

    }else{
        res.status(404).json({ message: 'User not found' })
    }
})



