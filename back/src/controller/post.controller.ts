import { postModel } from "../model/post.model";
import {Request, Response} from 'express'

export function createPost(req: Request, res: Response) {
    postModel.create({name: req.query.name, content: req.file});

    res.status(201).json({
        message: 'Post created successfuly'
    })
}

export function getAllPosts(req: Request, res: Response) {
    try {
        const allPosts = postModel.find({user: {name: req.query.name}});
        res.status(200).json({
            data: allPosts
        })
    } catch(err) {
        res.status(204).json({
            message: "No posts found"
        })
    }
}
