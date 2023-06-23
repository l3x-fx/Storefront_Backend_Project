"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
//@ts-ignore
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./handlers/users"));
const products_1 = __importDefault(require("./handlers/products"));
const oders_1 = __importDefault(require("./handlers/oders"));
const servicehandler_1 = __importDefault(require("./handlers/servicehandler"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const corsOptions = {
    optionsSuccessStatus: 200
};
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, oders_1.default)(app);
(0, servicehandler_1.default)(app);
