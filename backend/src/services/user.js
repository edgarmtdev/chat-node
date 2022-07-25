import mongoose from 'mongoose';
import hasErrors from '../helpers/errors'
import UserModel from '../models/user'
import Chat from './chat';

class User {

    constructor() {
        this.chatService = new Chat()
    }

    #convertID(data) {
        return new mongoose.Types.ObjectId(data)
    }

    async getAll() {
        try {
            return await UserModel.find()
                .populate('friendshipReq', ['name', 'email'])
                .populate('friendshipRec', ['name', 'email'])
                .populate('friends', ['name', 'email']);

        } catch (error) {
            console.log(error);
        }
    }

    async getByEmail(email) {
        try {
            const userFound = await UserModel.findOne({ email })
                .populate('friendshipReq', ['name', 'email'])
                .populate('friendshipRec', ['name', 'email'])
                .populate('friends', ['name', 'email']);
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
            const user = await UserModel.findByIdAndUpdate(
                { _id: idUser },
                {
                    $push: {
                        friendshipReq: this.#convertID(idFriend)
                    }
                },
                { new: true }
            )
            await UserModel.findByIdAndUpdate(
                { _id: idFriend },
                {
                    $push: {
                        friendshipRec: this.#convertID(idUser)
                    }
                },
                { new: true }
            )

            return {
                friends: user.friends,
                receivedRec: user.friendshipRec,
                sendedReq: user.friendshipReq
            }
        } catch (error) {
            console.log(error)
        }
    }

    async acceptRequest(idUser, idSender) {
        const user = await UserModel.findByIdAndUpdate(
            { _id: idUser },
            {
                $push: {
                    friends: this.#convertID(idSender)
                },
                $pull: {
                    friendshipRec: this.#convertID(idSender)
                }
            },
            { new: true }
        )
        await UserModel.findByIdAndUpdate(
            { _id: idSender },
            {
                $push: {
                    friends: this.#convertID(idUser)
                },
                $pull: {
                    friendshipReq: this.#convertID(idUser)
                }
            },
            { new: true }
        )
        await this.chatService.newChat({
            idUserOne: idSender,
            idUserTwo: idUser
        })
        return {
            friends: user.friends,
            receivedRec: user.friendshipRec,
            sendedReq: user.friendshipReq
        }
    }
}

export default User