"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificMonster = void 0;
const monster_model_1 = require("../model/monster.model");
function getSpecificMonster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchName = req.query.search;
        monster_model_1.monsterModel
            .findOne({
            name: new RegExp('.*' + searchName + '.*')
        })
            .then(e => {
            res.json(e);
        })
            .catch(() => {
            res.status(204).json({
                message: 'Monster Not Found'
            });
        });
    });
}
exports.getSpecificMonster = getSpecificMonster;
