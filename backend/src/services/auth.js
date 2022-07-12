import User from './user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config'

class Auth {

    constructor() {
        this.userService = new User()
    }

    async #encrypt(password) {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }

    async #compare(password, encrypted) {
        return await bcrypt.compare(password, encrypted)
    }

    async #getToken(data) {
        const token = jwt.sign(data, config.jwtSecret, {
            expiresIn: "2d"
        })
        return {
            success: true,
            data,
            token
        }
    }

    #buildUserData(user) {
        const data = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
        return this.#getToken(data)
    }

    async signIn({ email, password }) {
        try {
            const {
                success,
                user
            } = await this.userService.getByEmail(email)

            if (!success) return {
                success: false,
                message: 'No user found'
            }

            const compare = await this.#compare(password, user.password)
            if (compare) {
                const result = this.#buildUserData(user)
                return result
            }

        } catch (error) {
            return error
        }
    }

    async register(data) {
        try {
            if (data && data.password) {
                data.password = await this.#encrypt(data.password)
            }
            const user = await this.userService.create(data)
            return user
        } catch (error) {

        }
    }
}

export default Auth