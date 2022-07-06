import hasErrors from '../helpers/errors'
import UserModel from '../models/user'

export default class User {
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