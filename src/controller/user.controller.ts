import { userModel } from '../model/user.model'
import { Request, Response } from 'express'
import { decodeToken, generateAccessToken } from '../service/auth'
import { hashSync, compare, compareSync } from 'bcrypt'

export async function register(req: Request, res: Response) {
  const encryptedPassword = hashSync(req.body.password, 10)

  await userModel
    .create({
      username: req.body.name,
      email: req.body.email,
      password: encryptedPassword
    })
    .then(e => {
      console.log(e)
      res.json({ token: generateAccessToken(e.id), id: e.id })
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
  await userModel
    .findOne({ email: req.body.email })
    .then(async user => {
      const comparePassword = await compareSync(
        req.body.password,
        user.password
      )

      if (!comparePassword) {
        return res.status(401).json({
          message: 'Usuário ou senha inválidos'
        })
      }
      res.status(200).json({
        token: generateAccessToken(user.id),
        id: user.id
      })
    })
    .catch(e => {
      return res.status(400).json({ message: 'Usuário não encontrado' })
    })
}
