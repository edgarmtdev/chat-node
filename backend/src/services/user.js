import mongoose from 'mongoose';
import hasErrors from '../helpers/errors'
import UserModel from '../models/user'

class User {

    async getAll() {
        try {
            return await UserModel.find()
              .populate("friendshipReq")
              .populate("friendshipRec")
              .populate("friends");
     
        } catch (error) {
            console.log(error);
        }
    }

    async getByEmail(email) {
        try {
            const userFound = await UserModel.findOne({ email })
            if (userFound) return {
                success: true,
                user: userFound
            }

            return { success: false }
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

    async sendRequest(idUser, idFriend) {
        try {

            console.log(idUser, idFriend);

            const user = await UserModel.findByIdAndUpdate(
                { _id: idUser },
                {
                    $push: { friendshipReq: new mongoose.Types.ObjectId(idFriend) }
                },
                { new: true }
            )
            // const friend =
            await UserModel.findByIdAndUpdate(
                { _id: idFriend },
                {
                    $push: { friendshipRec: new mongoose.Types.ObjectId(idUser) }
                },
                { new: true }
            )

            return {
                receivedRec: user.friendshipRec,
                sendedReq: user.friendshipReq
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default User