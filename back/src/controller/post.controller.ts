import { postModel } from '../model/post.model'
import { Request, Response } from 'express'

export async function createPost(req: Request, res: Response) {
  // req.file.
  postModel
    .create({
      title: req.body.title,
      path: 'http://localhost:8080/posts/' + req.file?.filename,
      text: req.body.text
    })
    .then(() => {
      res.status(201).json({
        message: 'Post created successfuly'
      })
    })
}

export function getPost(req: Request, res: Response) {
  console.log(__dirname, '../upload')
  postModel
    .findOne({
      title: new RegExp('.*' + req.query.title + '.*')
    })
    .then(post => {
      res.json(post)
    })
    .catch(_ => res.status(204).json({ message: 'No post found' }))
}
