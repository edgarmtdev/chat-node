const users = []
const messages = []

class Chat {
    constructor(io) {
        this.io = io
        this.io.on('connection', (socket) => {
            console.log('A user connected')
            socket.on('active', (data) => {
                users.push(data)
                io.emit('user connected', users)
            })

            socket.on('disconnect', () => {
                users.pop()
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