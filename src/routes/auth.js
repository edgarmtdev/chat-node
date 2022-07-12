import { Router } from 'express'
import Auth from '../services/auth'

export default function auth(app) {
    const router = Router()
    app.use('/api/auth', router)
    const authService = new Auth()

    router.post('/signin', async (req, res) => {
        const result = await authService.signIn(req.body)
        console.log(result);
        return res.cookie('token', result.token, {
            httpOnly: true,
            secure: false,
            expires: new Date(new Date().setDate(new Date().getDate() + 7)),
            sameSite: 'none'
        }).json(result)
    })

    router.post('/register', async (req, res) => {
        const result = await authService.register(req.body)
        return res
            .status(result.code ? result.code : 200)
            .json(result)
    })

}