import express from "express";
import { createPost, getAllPosts } from "../controller/post.controller";
import multer from 'multer'
import { ensureAuthenticated } from "../service/auth";

const upload = multer();
const router = express.Router()

router.post('/', ensureAuthenticated, upload.single('post'), createPost);

router.get('/', ensureAuthenticated, getAllPosts);

export default router;