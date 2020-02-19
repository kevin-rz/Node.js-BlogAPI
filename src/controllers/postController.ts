import { Router } from 'express'
import jwt from 'jsonwebtoken'
import postRepository from '../repositories/postRepository'

export const postController = Router()

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

postController.post('/', async(req, res) => {

    const post = await postRepository.savePost(req.body)

    if(post) {
        res.status(200).json({ post: post, message:"Post created correctly"})
    }else{
        res.status(400).json({ error: 'Something is wrong with request' })
    }

})

postController.post('/:id/comment', async(req, res) => {
    const id = req.params.id

    const comment = await postRepository.commentPost(req.body, id)

    if(comment) {
        res.status(200).json({ comment: comment, message:"Post created correctly"})
    }else{
        res.status(400).json({ error: 'Something is wrong with request' })
    }

})

postController.get('/:id', checkToken,  async (req, res) => {
    const id = req.params.id

    const post = await postRepository.findPostById(id)

    if(post){
        res.status(200).json({post: post})

    }else{
        res.status(404).json({ message: 'Post not found' })
    }
})

postController.delete('/:id', checkToken,  async (req, res) => {
    const id = req.params.id

    const post = await postRepository.deletePostById(id)

    if(post){
        res.status(200).json({message: 'Post deleted corectly'})

    }else{
        res.status(404).json({ message: 'Post not found' })
    }
})

postController.patch('/:id', checkToken,  async (req, res) => {
    const id = req.params.id
    const user = await postRepository.updatePost(id, req.body)

    if(user){
        res.status(200).json({message: 'Post modified corectly'})

    }else{
        res.status(404).json({ message: 'Post not found' })
    }
})