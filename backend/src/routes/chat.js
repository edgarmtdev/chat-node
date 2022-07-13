import Chat from "../services/chat"
import socketConnection from '../libs/socket'

function chat(server) {
    // socket.io
    const io = socketConnection(server)
    new Chat(io)
}

export default chat