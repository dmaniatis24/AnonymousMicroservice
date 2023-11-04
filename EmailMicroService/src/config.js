"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = () => {
    return {
        db: {
            connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_NAME,
            port: process.env.MYSQL_PORT
        },
        google: {}
    };
};
exports.default = config();
