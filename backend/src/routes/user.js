import { Router } from 'express'
import User from '../services/user'

export default function user(app) {
    const router = Router()
    app.use('/api/users', router)
    const userService = new User()

    router.get('/', async (req, res) => {
        const users = await userService.getAll()
        return res.json(users)
    })

    router.get('/one', async (req, res) => {
        const user = await userService.getByEmail(req.query.email)
        return res.json(user)
    })

    router.post('/send-request', async (req, res) => {
        const { idUser, idFriend } = req.body
        const user = await userService.sendRequest(idUser, idFriend)
        return res.json(user)
    })

    router.post('/accept-request', async (req, res) => {
        const { idUser, idSender } = req.body
        const user = await userService.acceptRequest(idUser, idSender)
        return res.json(user)
    })
}