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
exports.ServiceStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class ServiceStore {
    showTopFiveProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT product_id, COUNT(product_id) AS Count FROM order_products GROUP BY product_id ORDER BY Count DESC LIMIT 5;';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get Top 5 products. Error: ${err}`);
            }
        });
    }
    showProductsOfOrder(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [order_id]);
                conn.release();
                return result.rows;
            }
            catch (_a) {
                throw new Error(`Could not get products of order `);
            }
        });
    }
    showRecentOrderByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql1 = 'SELECT * FROM orders WHERE user_id=($1) ORDER BY id DESC LIMIT 1;';
                const result = yield conn.query(sql1, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user ${id}. Error: ${err}`);
            }
        });
    }
    showCompletedOrdersByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=complete;';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not add completed orders of user user ${id}. Error: ${err}`);
            }
        });
    }
}
exports.ServiceStore = ServiceStore;
//SELECT * FROM orders WHERE user_id=($1) AND status=completed JOIN order_products ON orders.id=order_products.order_id
