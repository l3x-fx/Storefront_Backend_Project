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
const dashboard_1 = require("../services/dashboard");
//import jwt from 'jsonwebtoken'
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const service = new dashboard_1.ServiceStore();
const showTopFiveProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topFive = yield service.showTopFiveProducts();
    res.json(topFive);
});
const showRecentOrderByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield service.showRecentOrderByUserId(req.params.userId);
    const details = yield service.showProductsOfOrder(order.id);
    const detailedOrder = {
        id: order.id,
        user_id: order.user_id,
        status: order.status,
        products: details
    };
    res.json(detailedOrder);
});
// const showCompletedByUser = async (req: Request, res: Response) => { 
//     const orders = await service.showCompletedOrdersByUser(req.params.userId);
//     const detailedOrders = await Promise.all(
//         orders.map(async (order) => {
//             const details = await service.showProductsOfOrder(order.id as number);
//             return {
//             id: order.id,
//             user_id: order.user_id,
//             status: order.status,
//             products: details,
//             };
//         })
//     );
//
//    res.json(detailedOrders);
//}
const service_routes = (app) => {
    app.get('/products/top5', showTopFiveProducts);
    app.get('/users/:userId/order/recent', showRecentOrderByUserId);
    //  app.get('/users/:userId/orders/complete', showCompletedByUser)
    // app.put('/users/:id', verifyAuthToken, update)
    // app.delete('/users/:id', verifyAuthToken, destroy)
};
exports.default = service_routes;
