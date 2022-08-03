import cookie from 'cookie'
import Auth from './auth'
import chatModel from '../models/chat'
let users = []

class Chat {
    constructor(io) {
        this.io = io
        if (io) {
            this.io.on('connection', async (socket) => {
                const { token } = cookie.parse(socket.handshake.headers.cookie)
                if (token) {
                    const userData = Auth.validateToken(token)
                    socket.on('online', async () => {
                        socket.user = userData

                        const user = users.find(user => user.id === userData.id)
                        if (!user) {
                            users.push({
                                ...userData,
                                idSocket: socket.id
                            })
                        }
                        io.emit('user connected', users)
                    })

                    socket.on('disconnect', () => { })
                    socket.on('disconnected', () => {
                        console.log('Disconnect');
                        users = users.filter(user => user.idUser !== socket.idUser)
                        io.emit('user disconnected', users)
                    })

                    socket.on('send message', async (socketFriend, idFriend, message) => {
                        console.log(socketFriend);
                        const newMessage = await this.sendMessage(socket.user.id, idFriend, message)

                        console.log(newMessage);

                        socket.to(socketFriend).emit('private send message', message)
                        io.to(socket.id).emit('message sended', message)
                    })
                }
            })
        }
    }

    async getChat(idUser, idFriend) {
        try {
            const chat = await chatModel.findOne({
                $or: [{
                    idUserOne: idUser,
                    idUserTwo: idFriend
                }, {
                    idUserOne: idFriend,
                    idUserTwo: idUser
                }]
            })

            return chat
        } catch (error) {

        }
    }

    async getChats(idUser) {
        try {
            const chats = await chatModel.find({
                $or: [{
                    idUserOne: idUser
                }, {
                    idUserTwo: idUser
                }]
            })
            return {
                success: true,
                chats
            }
        } catch (error) {
            console.log(error);
        }
    }

    async newChat(data) {
        try {
            const chat = chatModel.create(data)
            return chat
        } catch (error) {

        }
    }


    async sendMessage(idUser, idFriend, message) {
        try {
            const chat = await chatModel.findOneAndUpdate({
                $or: [{
                    idUserOne: idUser,
                    idUserTwo: idFriend
                }, {
                    idUserOne: idFriend,
                    idUserTwo: idUser
                }]
            }, {
                $push: {
                    messages: {
                        idSender: idUser,
                        content: message
                    }
                }
            }, {
                new: true
            })

            return chat
        } catch (error) {
            return error
        }
    }
}

export default Chat