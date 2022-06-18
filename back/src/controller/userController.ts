import { userModel } from '../model/userModel'
import { Request, Response } from 'express'
import { generateAccessToken } from '../service/auth'
import { hash, compare } from 'bcrypt'

export function register(req: Request, res: Response) {
  //check unicity of username
  try {
    userModel.findOne(req.body.username).exec()
  } catch (err) {
    res.status(409).json({
      message: 'Nome já utilizado'
    })
  }
  //check unicity of username
  try {
    userModel.findOne(req.body.email).exec()
  } catch (err) {
    res.status(409).json({
      message: 'email já utilizado'
    })
  }

  const encryptedPassword = hash(req.body.username, 10)

  userModel
    .create({
      username: req.body.username,
      email: req.body.email,
      password: encryptedPassword
    })
    .then(_ => {
      res.status(201).json({
        message: 'Registro efetuado com sucesso'
      })
    })
}

export async function login(req: Request, res: Response) {
  try {
    const user = await userModel.findOne(req.body.username).exec()
    const comparePassword = compare(req.body.password, user.password)

    if (!comparePassword) {
      throw new Error()
    }
  } catch (err) {
    res.status(401).json({
      message: 'Usuário ou senha inválidos'
    })
  }

  res.status(200).json({
    token: generateAccessToken(req.body.username)
  })
}
