import app from './src/app'
import { config } from './src/config'
import { connection } from './src/config/db'
import socketConnection from './libs/socket'
import chat from './src/routes/chat'

connection()

const PORT = config.port || 4000

const server = app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
})

// socket.io
const io = socketConnection(server)
chat(app, io)