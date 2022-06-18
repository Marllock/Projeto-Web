import { Schema, model } from 'mongoose'

const ailmentSchema = new Schema({
  name: String,
  description: String
})

export const ailmentModel = model('Ailment', ailmentSchema)
