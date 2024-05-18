import { Schema, model } from "mongoose";
import { User as IUser } from "../@types/SchemaTypes";

const userSchema = new Schema<IUser>({
    nickname: { type: String, required: true },
    id: { type: String, required: true },
    password: { type: String, required: true },
})

const User = model<IUser>('User', userSchema);

export { User };