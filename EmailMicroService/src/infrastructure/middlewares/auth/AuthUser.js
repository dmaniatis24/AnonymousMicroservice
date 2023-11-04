"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateMiddleware = void 0;
const Token_1 = __importDefault(require("../../utilities/Token"));
const GetEnvVar_1 = require("../../utilities/GetEnvVar");
const authenticateMiddleware = async (req, res, next) => {
    const tokenAdmin = req.cookies[(0, GetEnvVar_1.getEnvVar)('ADMIN_TOKEN')];
    if (!tokenAdmin.token) {
        // const tokenUser = req.cookies[<string>getEnvVar('USER_TOKEN')]
        // if (!tokenUser) {
        //
        // }
        return res.status(401).json({ error: 'Unauthorized', message: 'Missing Token' });
    }
    const tok = new Token_1.default();
    if (!(await tok.validateToken(tokenAdmin.token))) {
        return res.status(401).json({ error: 'Forbidden', message: 'Invalid Token...' });
    }
    req.user = await tok.decodeToken(tokenAdmin.token);
    next();
};
exports.authenticateMiddleware = authenticateMiddleware;
