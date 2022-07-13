import app from './src/app'
import { config } from './src/config'
import { connection } from './src/config/db'
import chat from './src/routes/chat'

connection()

const PORT = config.port || 4000

const server = app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
})

// Chat route
chat(server)