import express from 'express'
import { createPost, getAllPosts, getPost } from '../controller/post.controller'
import multer from 'multer'
import { ensureAuthenticated } from '../service/auth'
import path from 'path'

const uploadFolder = path.resolve(__dirname, '../upload')

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadFolder
  })
})
const router = express.Router()

router.use('/', express.static(uploadFolder))

router.post('/', ensureAuthenticated, upload.single('post'), createPost)

router.get('/', ensureAuthenticated, getAllPosts)

router.get('/:postId', ensureAuthenticated, getPost)

export default router
