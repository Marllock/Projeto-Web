import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: String,
  senha: String,
});

export const userModel = model("User", userSchema);
