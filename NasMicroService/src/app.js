"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const Logger_1 = __importDefault(require("./infrastructure/utilities/Logger"));
const MySql_1 = __importDefault(require("./infrastructure/utilities/MySql"));
//Import Routes
const login_route_1 = __importDefault(require("./api/login/login.route"));
const upload_route_1 = __importDefault(require("./api/upload/upload.route"));
const download_route_1 = __importDefault(require("./api/download/download.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
const dateTime = require('node-datetime');
// const RedisMy = require('./packages/help/RedisMy')
// DB
const mysql = new MySql_1.default({ logger: Logger_1.default, options: config_1.default.db });
//Error Handler
const errorMiddlewareGenerator = require('./infrastructure/middlewares/Errors');
const globalErrorMiddleware = errorMiddlewareGenerator(Logger_1.default);
app.use(globalErrorMiddleware);
// ========================== R O U T E S ==========================
app.use('/api/', login_route_1.default);
app.use('/api/upload', upload_route_1.default);
app.use('/api/download', download_route_1.default);
// =================================================================
module.exports = app;
