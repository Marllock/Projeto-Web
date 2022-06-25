import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: { required: true, type: String, unique: true },
  email: { required: true, type: String, unique: true },
  password: { type: String, required: true }
})

export const userModel = model('User', userSchema)
