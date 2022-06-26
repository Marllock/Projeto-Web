import mongoose from 'mongoose'
import express, { Request, Response, NextFunction } from 'express'
import userRouter from './routes/user.router'
import monsterRouter from './routes/monster.router'
import postRouter from './routes/post.router'
import cors from 'cors'

mongoose
  .connect('mongodb://127.0.0.1:27017/monsterdb')
  .then(_ => console.log('Conectou'))
  .catch(_ => console.log('Deu Melda'))

const app = express()

app.use(express.json())
app.use(cors())

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    response.json({
      status: 'Error',
      message: error.message
    })
  }
)

app.use('/users', userRouter)
app.use('/monsters', monsterRouter)
app.use('/posts', postRouter)

app.listen('8080', () => {
  console.log('http://localhost:8080')
})
