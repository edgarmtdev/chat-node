import { Router } from 'express'
import Auth from '../services/auth'
import setCookies from '../helpers/authentication/cookies'

export default function auth(app) {
    const router = Router()
    app.use('/api/auth', router)
    const authService = new Auth()

    router.post('/signin', async (req, res) => {
        const result = await authService.signIn(req.body)
        if (result.success) {
            const { token, data } = result
            return setCookies(res, token, data)
        }
        return res.json(result)
    })

    router.post('/register', async (req, res) => {
        const result = await authService.register(req.body)
        console.log(result);
        if (result.success) {
            const { token, data } = result
            return setCookies(res, token, data)
        }
        return res.json(result)
    })

}