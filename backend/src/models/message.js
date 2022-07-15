import { mongoose } from '../config/db'

const messageSchema = mongoose.Schema(
    {
        messages: [
            {
                idSender: {
                    type: mongoose.Types.ObjectId,
                    ref: 'user'
                },
                content: String,
                
            }
        ]
    }
)

export default mongoose.model('message', messageSchema)