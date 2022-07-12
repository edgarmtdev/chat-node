import { Router } from "express"
import Chat from "../services/chat"

function chat(app, io) {
    const router = Router()
    app.use('/api/chats', router)

    new Chat(io)

}

export default chat