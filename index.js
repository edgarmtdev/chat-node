import app from './src/app'
import { config } from './src/config';
import { connection } from './src/config/db';

connection()

const PORT = config.port || 4000

app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
})