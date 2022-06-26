"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const monster_controller_1 = require("../controller/monster.controller");
const auth_1 = require("../service/auth");
const router = express_1.default.Router();
router.get('/', auth_1.ensureAuthenticated, monster_controller_1.getSpecificMonster);
exports.default = router;
