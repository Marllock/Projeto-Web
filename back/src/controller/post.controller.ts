import { postModel } from '../model/post.model'
import { Request, Response } from 'express'

export function createPost(req: Request, res: Response) {
  // req.file.
  postModel.create({
    name: req.query.name,
    filename: req.file?.filename,
    path: req.file?.path
  })

  res.status(201).json({
    message: 'Post created successfuly'
  })
}

export function getAllPosts(req: Request, res: Response) {
  try {
    const allPosts = postModel.find({ user: { username: req.query.name } })
    res.status(200).json(allPosts)
  } catch (err) {
    res.status(204).json({
      message: 'No posts found'
    })
  }
}

export function getPost(req: Request, res: Response) {
  const post = postModel
    .findOne({ id: req.params.postId })
    .then(_ => {
      res.json(post)
    })
    .catch(_ => res.status(204).json({ message: 'No post found' }))
}
