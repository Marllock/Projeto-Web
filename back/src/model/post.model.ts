import { Schema, model, SchemaTypes } from 'mongoose'

const postSchema = new Schema({
    name: String,
    content: {type: File},
    user: {type: SchemaTypes.ObjectId, ref: 'User'}
})

export const postModel = model('Post', postSchema)
