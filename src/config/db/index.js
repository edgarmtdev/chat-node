import mongoose from 'mongoose';
import config from '../'

const { dbUsername, dbPassword, dbHost, dbName } = config

const connection = async () => {
    const connect = await mongoose.connect(
        `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
    )
    console.log(`MongoDB connected: ${connect.connection.host}`)
}

export { connection, mongoose } 
