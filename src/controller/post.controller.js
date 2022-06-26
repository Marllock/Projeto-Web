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
exports.getPost = exports.createPost = void 0;
const post_model_1 = require("../model/post.model");
function createPost(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // req.file.
        post_model_1.postModel
            .create({
            title: req.body.title,
            path: 'http://localhost:8080/posts/' + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename),
            text: req.body.text
        })
            .then(() => {
            res.status(201).json({
                message: 'Post created successfuly'
            });
        });
    });
}
exports.createPost = createPost;
function getPost(req, res) {
    console.log(__dirname, '../upload');
    post_model_1.postModel
        .findOne({
        title: new RegExp('.*' + req.query.title + '.*')
    })
        .then(post => {
        res.json(post);
    })
        .catch(_ => res.status(204).json({ message: 'No post found' }));
}
exports.getPost = getPost;
