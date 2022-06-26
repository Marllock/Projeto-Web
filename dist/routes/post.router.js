"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controller/post.controller");
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../service/auth");
const path_1 = __importDefault(require("path"));
const uploadFolder = path_1.default.resolve(__dirname, '../upload');
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: uploadFolder,
        filename: (req, file, cb) => {
            const fileExtension = file.originalname.split('.')[1];
            cb(null, `${file.filename}.${fileExtension}`);
        }
    })
});
const router = express_1.default.Router();
router.use('/', express_1.default.static(uploadFolder));
router.post('/', auth_1.ensureAuthenticated, upload.single('file'), post_controller_1.createPost);
router.get('/', auth_1.ensureAuthenticated, post_controller_1.getPost);
exports.default = router;
