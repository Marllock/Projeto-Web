import { Request, Response, NextFunction } from 'express'
import { verify, sign } from 'jsonwebtoken'

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({
      message: 'Token is missing'
    })
  }

  const [, token] = authToken.split(' ')

  try {
    verify(
      token,
      '5781C44D6E840B5413543C0D3404F56F201818D0F2B37646A4BCCD973AF26674'
    )
  } catch (err) {
    return response.status(401).json({
      message: 'invalid token'
    })
  }

  next()
}

export function generateAccessToken(email: string) {
  return sign(
    email,
    '5781C44D6E840B5413543C0D3404F56F201818D0F2B37646A4BCCD973AF26674'
  )
}
