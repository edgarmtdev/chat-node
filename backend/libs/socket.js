import socketio from 'socket.io'

function connection(server) {
    const io = socketio(server, {
        cors: {
            origin: [
                'http://localhost:3000',
                'http://127.0.0.1:5500'
            ],
            credentials: true,
            methods: ['GET', 'POST']
        }
    })
    return io
}

export default connection