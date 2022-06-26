"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = require("../model/user.model");
const auth_1 = require("../service/auth");
const bcrypt_1 = require("bcrypt");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedPassword = (0, bcrypt_1.hashSync)(req.body.password, 10);
        yield user_model_1.userModel
            .create({
            username: req.body.name,
            email: req.body.email,
            password: encryptedPassword
        })
            .then(e => {
            console.log(e);
            res.json({ token: (0, auth_1.generateAccessToken)(e.email) });
        })
            .catch((e) => __awaiter(this, void 0, void 0, function* () {
            let message = '';
            let status = 400;
            if (yield user_model_1.userModel.findOne({ username: req.body.name })) {
                message = 'Nome já utilizado';
                status = 409;
            }
            else if (yield user_model_1.userModel.findOne({ email: req.body.email })) {
                message = 'Email já utilizado';
                status = 409;
            }
            res.status(status).json({ message: message });
        }));
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield user_model_1.userModel
            .findOne({ email: req.body.email })
            .then((user) => __awaiter(this, void 0, void 0, function* () {
            const comparePassword = yield (0, bcrypt_1.compareSync)(req.body.password, user.password);
            if (!comparePassword) {
                return res.status(401).json({
                    message: 'Usuário ou senha inválidos'
                });
            }
            res.status(200).json({
                token: (0, auth_1.generateAccessToken)(req.body.email)
            });
        }))
            .catch(e => {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        });
    });
}
exports.login = login;
