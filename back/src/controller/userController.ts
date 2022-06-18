import { userModel } from "../model/userModel";
import {Request, Response} from 'express'

export function register(req: Request, res: Response) {

    //check unicity of username
    try {
        userModel.findOne(req.body.username).exec();
    } catch(err) {
        res.status(400).json({
            message: "Nome já utilizado"
        })
    }
    //check unicity of username
    try {
        userModel.findOne(req.body.email).exec();
    } catch(err) {
        res.status(400).json({
            message: "email já utilizado"
        })
    }

    userModel.create(req.body);
}

export function login(req: Request, res: Response) {
    try{
        userModel.findOne(req.body).exec();
    } catch(err) {
        res.status(400).json({
            message: 'Usuário inválido'
        })
    }


}