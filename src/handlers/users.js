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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
//import jwt from 'jsonwebtoken'
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const store = new user_1.UserStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.index();
    res.json(user);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.show(req.params.id);
    res.json(user);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = { firstname: req.body.firstname, lastname: req.body.lastname, password: req.body.password };
    const newUser = yield store.create(user);
    res.json(newUser);
});
const users_routes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    // app.put('/users/:id', verifyAuthToken, update)
    // app.delete('/users/:id', verifyAuthToken, destroy)
};
exports.default = users_routes;
