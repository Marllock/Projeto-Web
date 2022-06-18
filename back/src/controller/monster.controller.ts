import { monsterModel } from "../model/monster.model";
import { Request, Response } from "express";

export function getSpecificMonster(req: Request, res: Response) {
  const searchName = req.query.search;
  try {
    const monster = monsterModel.find({
      name: new RegExp(".*" + searchName + ".*"),
    });
  } catch (err) {
    res.status(204).json({
      message: "Monster Not Found",
    });
  }
}
