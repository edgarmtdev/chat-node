import { mongoose } from "../config/db"

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name required'],
            minlength: [3, 'Name min of 3 characters'],
            maxlength: [100, 'max 100'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email already exists'],
            match: [/[\w.-]+@[\w]+[\w.]+$/, 'Invalid Email']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password min of 6 characters']
        },
        role: {
            type: Number,
            default: 1
        },
        idProvider: {
            google: String,
            facebook: String
        },
        provider: {
            local: Boolean,
            google: Boolean,
            facebook: Boolean
        }
    }
)

export default mongoose.model('User', userSchema)