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
const product_1 = require("../models/product");
const dotenv_1 = __importDefault(require("dotenv"));
//import jwt from 'jsonwebtoken'
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const store = new product_1.ProductStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield store.index();
    res.json(product);
});
const showById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield store.showById(req.body.id);
    res.json(product);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = { name: req.body.name, price: req.body.price, category: req.body.category };
    const newProduct = yield store.create(product);
    res.json(newProduct);
});
const showByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield store.showByCategory(req.body.category);
    res.json(product);
});
const users_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', showById);
    app.post('/products', create);
    app.get('products/:category', showByCategory);
};
exports.default = users_routes;
