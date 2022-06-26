"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.ensureAuthenticated = exports.decodeToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function decodeToken(tokenEncoded) {
    const [, token] = tokenEncoded.split(' ');
    return (0, jsonwebtoken_1.decode)(token);
}
exports.decodeToken = decodeToken;
function ensureAuthenticated(request, response, next) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).json({
            message: 'Token is missing'
        });
    }
    const [, token] = authToken.split(' ');
    try {
        (0, jsonwebtoken_1.verify)(token, '5781C44D6E840B5413543C0D3404F56F201818D0F2B37646A4BCCD973AF26674');
    }
    catch (err) {
        return response.status(401).json({
            message: 'invalid token'
        });
    }
    next();
}
exports.ensureAuthenticated = ensureAuthenticated;
function generateAccessToken(email) {
    return (0, jsonwebtoken_1.sign)(email, '5781C44D6E840B5413543C0D3404F56F201818D0F2B37646A4BCCD973AF26674');
}
exports.generateAccessToken = generateAccessToken;
