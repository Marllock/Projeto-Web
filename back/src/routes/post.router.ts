import express from 'express'
import { createPost, getPost } from '../controller/post.controller'
import multer from 'multer'
import { ensureAuthenticated } from '../service/auth'
import path from 'path'

const uploadFolder = path.resolve(__dirname, '../upload')

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename: (req, file, cb) => {
      const fileExtension = file.originalname.split('.')[1]
      cb(null, `${file.filename}.${fileExtension}`)
    }
  })
})
const router = express.Router()

router.use('/', express.static(uploadFolder))

router.post('/', ensureAuthenticated, upload.single('file'), createPost)

router.get('/', ensureAuthenticated, getPost)

export default router
