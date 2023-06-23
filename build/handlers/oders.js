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
const dotenv_1 = __importDefault(require("dotenv"));
const order_1 = require("../models/order");
const services_1 = require("../services/services");
const servicehandler_1 = __importDefault(require("./servicehandler"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const store = new order_1.OrderStore();
const service = new services_1.ServiceStore();
//map products to details
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.index();
        res.json(order);
    }
    catch (error) {
        res.status(401).json({ error });
    }
});
const showByOrderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(req.params.orderId);
        const details = yield service.showProductsOfOrder(order.id);
        const detailedOrder = {
            id: order.id,
            user_id: order.user_id,
            status: order.status,
            products: details
        };
        res.json(detailedOrder);
    }
    catch (error) {
        res.status(401).json({ error });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield store.create(req.body.user_id);
        res.json(newProduct);
    }
    catch (error) {
        res.status(401).json({ error });
    }
});
const addProductToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedProduct = yield store.addProductToOrder(req.body.quantity, req.params.orderId, req.body.product_id);
        res.json(addedProduct);
    }
    catch (error) {
        res.status(401).json({ error });
    }
});
const orders_routes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:orderId', servicehandler_1.default, showByOrderId);
    app.post('/orders/', create);
    app.post('/orders/:orderId/products', addProductToOrder);
    // app.put('/users/:id', verifyAuthToken, update)
    // app.delete('/users/:id', verifyAuthToken, destroy)
};
exports.default = orders_routes;
