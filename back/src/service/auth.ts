import {Request, Response} from 'express'
import {verify, sign} from 'jsonwebtoken'

export function ensureAuthenticated(request: Request, response: Response) {
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).json({
            message: "Token is missing"
        })
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, process.env.TOKEN_SECRET as string);
    } catch(err) {
        return response.status(401).json({
            message: "invalid token"
        })
    }
}

export function generateAccessToken(username: string) {
    return sign(username, process.env.TOKEN_SECRET as string);
}