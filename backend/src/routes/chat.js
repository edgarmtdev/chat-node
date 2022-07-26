import Chat from "../services/chat"
import socketConnection from '../libs/socket'
import { Router } from "express"
import { authResponse } from "../middlewares/auth/response"

function chat(app, server) {
    // socket.io
    const io = socketConnection(server)
    const chatService = new Chat(io)

    const router = Router()
    app.use('/api/chats', router)

    router.get('/', authResponse(1), async (req, res) => {
        const idUser = req.user.id
        const chats = await chatService.getChats(idUser)
        return res.json(chats)
    })

    router.get('/:idUser/:idFriend', async (req, res) => {
        const { idUser, idFriend } = req.params
        const chat = await chatService.getChat(idUser, idFriend)
        return res.json(chat)
    })
}

export default chat