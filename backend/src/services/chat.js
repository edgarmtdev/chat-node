const users = []
const messages = []

class Chat {
    constructor(io) {
        this.io = io
        this.io.on('connection', (socket) => {
            console.log('A user connected')
            socket.on('active', (data) => {
                users.push(data)
                console.log(data)
                console.log(users)
                io.emit('user connected', users)
            })

            socket.on('disconnect', () => {
                users.pop()
                io.emit('user disconnected', users)
            })
        })
    }
}

export default Chat