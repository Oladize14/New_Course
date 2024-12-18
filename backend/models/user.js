import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)
