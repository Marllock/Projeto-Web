import express from 'express'
import { getSpecificMonster } from '../controller/monster.controller'
import { ensureAuthenticated } from '../service/auth'

const router = express.Router()

router.get('/', ensureAuthenticated, getSpecificMonster)

export default router;