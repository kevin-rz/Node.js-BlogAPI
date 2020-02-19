import express from 'express'
import bodyParser from 'body-parser'
import { userController } from './controllers/userController'
import { postController } from './controllers/postController'
import { connectDB } from './repositories'

const port = 1337

const app = express()
app.use( bodyParser.json() )

app.use( '/users', userController)
app.use( '/posts', postController)

app.get('/', (req, res) => {
    res.send('API is running OK')
})

connectDB().then( async() => {
    app.listen(port, ()=> {
        console.log("APi is running on port " + port)
    })
})


