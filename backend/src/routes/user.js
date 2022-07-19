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

    router.post('/addfriend', async (req, res) => {
        const { idUser, idFriend } = req.body
        const user = await userService.sendRequest(idUser, idFriend)
        return res.json(user)
    })
}