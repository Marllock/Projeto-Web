"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monsterModel = void 0;
const mongoose_1 = require("mongoose");
const monsterSchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    type: String,
    species: String,
    description: String,
    elements: [String]
});
exports.monsterModel = (0, mongoose_1.model)('Monster', monsterSchema);
