import { userModel } from '../model/user.model'
import { Request, Response } from 'express'
import { generateAccessToken } from '../service/auth'
import { hashSync, compare, compareSync } from 'bcrypt'

export async function register(req: Request, res: Response) {
  //check unicity of username
  // userModel.findOne({ username: req.body.name }).catch(_ => {
  //   res.status(409).json({ message: 'Username already active' })
  // })

  // //check unicity of username
  // await userModel.findOne({ email: req.body.email }).catch(_ => {
  //   res.status(409).json({ message: 'Email already active' })
  // })

  const encryptedPassword = hashSync(req.body.password, 10)

  await userModel
    .create({
      username: req.body.name,
      email: req.body.email,
      password: encryptedPassword
    })
    .catch(async e => {
      let message = ''
      let status = 400
      if (await userModel.findOne({ username: req.body.name })) {
        message = 'Nome já utilizado'
        status = 409
      } else if (await userModel.findOne({ email: req.body.email })) {
        message = 'Email já utilizado'
        status = 409
      }
      res.status(status).json({ message: message })
    })
}

export async function login(req: Request, res: Response) {
  const user = await userModel.findOne({ email: req.body.email }).catch(e => {
    return res.status(400).json({ message: 'Usuário não encontrado' })
  })

  const comparePassword = compareSync(req.body.password, user.password)

  if (!comparePassword) {
    return res.status(401).json({
      message: 'Usuário ou senha inválidos'
    })
  }
  res.status(200).json({
    token: generateAccessToken(req.body.email)
  })
}
