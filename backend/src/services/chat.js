import cookie from 'cookie'
import Auth from './auth'
import chatModel from '../models/chat'
let chats = []
let messages = []
let users = []

class Chat {
    constructor(io) {
        this.io = io
        if (io) {
            this.io.on('connection', (socket) => {
                const { token } = cookie.parse(socket.handshake.headers.cookie)
                if (token) {
                    const userData = Auth.validateToken(token)
                    socket.on('online', () => {
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

                    socket.on('disconnect', () => {
                    })
                    socket.on('disconnected', () => {
                        console.log('Disconnect');
                        users = users.filter(user => user.idUser !== socket.idUser)
                        io.emit('user disconnected', users)
                    })

                    socket.on('send message', (idSocket, message) => {
                        const idChat = socket.idUser + idSocket
                        const newChat = {
                            id: idChat,
                            sender: socket.user.id,
                            received: idSocket,
                            messages: [...messages, message]
                        }

                        if (chats.length === 0) {
                            chats.push(newChat)
                            console.log(chats);
                            socket.to(idSocket).emit('private send message', newChat)
                            io.to(socket.idUser).emit('message sended', newChat)
                        } else {
                            chats.forEach(chat => {
                                if (chat.id === idChat) {
                                    chat.messages.push(message)
                                    socket.to(idSocket).emit('private send message', chat)
                                    io.to(socket.idUser).emit('message sended', chat)
                                } else {
                                    chats.push(newChat)
                                    socket.to(idSocket).emit('private send message', chat)
                                    io.to(socket.idUser).emit('message sended', chat)
                                }
                            })
                        }
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
                $or: [{ idUserOne: idUser }, { idUserTwo: idUser }]
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
}

export default Chat