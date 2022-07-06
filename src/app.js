import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

const app = express()

// Routes
import auth from './routes/auth'
import user from './routes/user'

//Midlewares
app.use(morgan('dev'))
app.use(express.json())


// Use Routes
auth(app)
user(app)

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