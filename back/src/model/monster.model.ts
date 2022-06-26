import { Schema, model } from 'mongoose'

const monsterSchema = new Schema({
  name: { type: String, unique: true },
  type: String,
  species: String,
  description: String,
  elements: [String]
})

export const monsterModel = model('Monster', monsterSchema)
