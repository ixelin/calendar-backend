import { Schema, model, Document } from "mongoose"

interface IUser extends Document {
    username: string;
    password: string;
    id: number;
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    id: {
        type: Number,
        default: Date.now()
    }
})

const User = model<IUser>('User', UserSchema)
export default User;