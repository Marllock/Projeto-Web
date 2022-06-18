import { Schema, model, SchemaTypes } from 'mongoose'

const monsterSchema = new Schema({
  name: { type: String, unique: true },
  type: String,
  species: String,
  description: String,
  elements: [String],
  ailments: [{ type: SchemaTypes.ObjectId, ref: 'Ailment' }],
  locations: [{ type: SchemaTypes.ObjectId, ref: 'Location' }],
  resistances: [ String ],
  weakness: [String]
})

export const monsterModel = model('Monster', monsterSchema)
