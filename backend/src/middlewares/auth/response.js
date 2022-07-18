import jwt from 'jsonwebtoken'
import { config } from '../../config'

export function authResponse(role) {
    return (req, res, next) => {
        req.needRole = role
        return validateToken(req, res, next)
    }
}

function validateToken(req, res, next) {
    if (!req.cookies.token) return res.status(403).json({
        success: false,
        message: 'No token provider'
    })
    const token = req.cookies.token
    decodeToken(req, res, next, token)
}

function decodeToken(req, res, next, token) {
    try {
        const decoded = jwt.verify(token, config.jwtSecret)
        delete decoded.iat
        delete decoded.exp
        req.user = decoded
        return next()
    } catch ({ message, name }) {
        return res.status(403).json({
            success: false,
            message,
            type: name
        })
    }
}