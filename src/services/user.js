import hasErrors from '../helpers/errors'
import UserModel from '../models/user'

class User {

    async getByEmail(email) {
        try {
            const userFound = await UserModel.findOne({ email })
            return {
                success: true,
                user: userFound 
            }
        } catch (error) {
            console.log(error);
        }
    }

    async create(data) {
        try {
            const user = await UserModel.create(data)
            return {
                success: true,
                user
            }
        } catch (error) {
            return hasErrors(error)
        }
    }
}

export default User