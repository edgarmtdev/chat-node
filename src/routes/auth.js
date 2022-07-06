import { Router } from 'express'
import Auth from '../services/auth'

export default function auth(app) {
    const router = Router()
    app.use('/api/auth', router)
    const authService = new Auth()

    router.post('/register', async (req, res) => {
        const result = await authService.register(req.body)
        return res.json(result)
    })

}