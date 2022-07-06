import User from './user'
import bcrypt from 'bcrypt'

class Auth {

    constructor() {
        this.userService = new User()
    }

    async #encrypt(password) {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }

    async register(data) {
        if (data && data.password) {
            data.password = await this.#encrypt(data.password)
        }
        const user = await this.userService.create(data)
        return user
    }
}

export default Auth