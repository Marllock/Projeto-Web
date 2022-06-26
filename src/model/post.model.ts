import { Schema, model, SchemaTypes } from 'mongoose'

const postSchema = new Schema({
  title: { type: String, required: true },
  path: String,
  text: String,
  user: { type: SchemaTypes.ObjectId, ref: 'User' }
})

export const postModel = model('Post', postSchema)
