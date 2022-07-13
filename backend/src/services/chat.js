let users = []
const messages = []

class Chat {
    constructor(io) {
        this.io = io
        this.io.on('connection', (socket) => {
            console.log('A user connected')
            socket.on('active', (data) => {
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

            socket.on('send message', (message) => {
                messages.push(message)
                io.emit('res message', message)
            })
        })
    }
}

export default Chat