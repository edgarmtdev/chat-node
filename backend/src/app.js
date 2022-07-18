import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookie from 'cookie-parser' 
import pkg from '../package.json'

const app = express()

// Routes
import auth from './routes/auth'
import user from './routes/user'
import files from './routes/files'

//cors
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:5500'
    ],
    credentials: true
}))

//Midlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookie())

// Use Routes
auth(app)
user(app)
files(app)

// Project details
app.set('pkg', pkg)
app.get('/', (req, res) => {
    const data = {
        name: app.get('pkg').name,
        version: app.get('pkg').version,
        description: app.get('pkg').description,
        author: app.get('pkg').author
    }
    return res.json(data)
})

export default app