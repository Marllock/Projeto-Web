"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const monster_router_1 = __importDefault(require("./routes/monster.router"));
const post_router_1 = __importDefault(require("./routes/post.router"));
const cors_1 = __importDefault(require("cors"));
mongoose_1.default
    .connect('mongodb://127.0.0.1:27017/monsterdb')
    .then(_ => console.log('Conectou'))
    .catch(_ => console.log('Deu Melda'));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((error, request, response, next) => {
    response.json({
        status: 'Error',
        message: error.message
    });
});
app.use('/users', user_router_1.default);
app.use('/monsters', monster_router_1.default);
app.use('/posts', post_router_1.default);
app.listen(process.env.PORT || 3000, () => {
    console.log('http://localhost:8080');
});
