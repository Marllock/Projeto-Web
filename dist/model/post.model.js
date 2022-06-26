"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    path: String,
    text: String,
    user: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'User' }
});
exports.postModel = (0, mongoose_1.model)('Post', postSchema);
