import express from "express";
import { login, register } from "../controller/userController";

const router = express.Router();

//Criar novo usuário
router.post('/register', register);

//Recupera um usuário
router.get('/login', login);

export default router;