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
                read: {
                    type: Boolean,
                    default: false
                }
            }
        ]
    },{
        timestamps:true
    }
)

const chatSchema = mongoose.Schema(
    {
        idUserOne: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        idUserTwo: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        messages: [messageSchema]
    }
)

export default mongoose.model('message', chatSchema)