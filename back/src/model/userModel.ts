import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  username: String,
  email: String,
  senha: String
})

export const userModel = mongoose.model('User', userSchema)
