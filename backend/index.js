import app from './src/app'
import { config } from './src/config';
import { connection } from './src/config/db';
import socketConnection from './libs/socket'
import Chat from './src/services/chat';

connection()

const PORT = config.port || 4000

const server = app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
})

const io = socketConnection(server)
new Chat(io)