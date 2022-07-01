import app from './src/app'
import { port } from './src/config';
import { connection } from './src/config/db';

connection()

const PORT = port || 4000

app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
})