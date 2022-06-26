import { monsterModel } from '../model/monster.model'
import { Request, Response } from 'express'

export async function getSpecificMonster(req: Request, res: Response) {
  const searchName = req.query.search

  monsterModel
    .findOne({
      name: new RegExp('.*' + searchName + '.*')
    })
    .then(e => {
      res.json(e)
    })
    .catch(() => {
      res.status(204).json({
        message: 'Monster Not Found'
      })
    })
}
