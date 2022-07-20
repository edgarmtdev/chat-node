import Chat from "../services/chat"
import socketConnection from '../libs/socket'
import { Router } from "express"

function chat(app, server) {
    // socket.io
    const io = socketConnection(server)
    new Chat(io)

    const router = Router()
    app.use('/api/chat/test', router)
}

export default chat