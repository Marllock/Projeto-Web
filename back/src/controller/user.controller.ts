import { userModel } from "../model/user.model";
import { Request, Response } from "express";
import { generateAccessToken } from "../service/auth";
import { hashSync, compare } from "bcrypt";

export function register(req: Request, res: Response) {
  //check unicity of username
  try {
    userModel.findOne({ name: req.body.name }).exec();
  } catch (err) {
    res.status(409).json({
      message: "Nome já utilizado",
    });
  }
  //check unicity of username
  try {
    userModel.findOne({ email: req.body.email }).exec();
  } catch (err) {
    res.status(409).json({
      message: "email já utilizado",
    });
  }

  const encryptedPassword = hashSync(req.body.name, 10);

  userModel.create({
    name: req.body.username,
    email: req.body.email,
    password: encryptedPassword,
  });
  res.status(201).json({
    message: "Registro efetuado com sucesso",
  });
}

export async function login(req: Request, res: Response) {
  try {
    const user = await userModel.findOne(req.body.username).exec();
    const comparePassword = await compare(req.body.password, user.password);

    if (!comparePassword) {
      throw new Error();
    }
  } catch (err) {
    res.status(401).json({
      message: "Usuário ou senha inválidos",
    });
  }

  res.status(200).json({
    token: generateAccessToken(req.body.username),
  });
}
