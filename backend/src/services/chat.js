import cookie from 'cookie'
import Auth from './auth'
let users = []
let chats = []
let messages = []

class Chat {
    constructor(io) {
        this.io = io
        this.io.on('connection', (socket) => {
            socket.on('active', (data) => {
                // const cookies = cookie.parse(socket.handshake.headers.cookie)
                // const userData = Auth.validateToken(cookies.token)
                // console.log(userData)
                socket.idUser = data
                users.push({
                    idUser: data,
                    idSocket: socket.id
                })
                console.log(users);
                io.emit('user connected', users)
            })

            socket.on('disconnect', () => {
                console.log('Disconnect');
                users = users.filter(user => user.idUser !== socket.idUser)
                console.log(users)
                io.emit('user disconnected', users)
            })

            socket.on('send message', (idSocket, message) => {
                const idChat = socket.idUser + idSocket
                const newChat = {
                    id: idChat,
                    sender: socket.idUser,
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
                        }
                    })
                }
            })
        })
    }
}

export default Chat