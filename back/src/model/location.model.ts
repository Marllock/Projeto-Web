import { Schema, model } from 'mongoose'

const locationSchema = new Schema({
  name: String
})

export const locationModel = model('Location', locationSchema)
