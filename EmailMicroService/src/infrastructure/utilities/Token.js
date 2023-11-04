"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() {
        this.secret = process.env.APP_SECRET;
    }
    async generateToken(payload) {
        try {
            const options = {
                expiresIn: '3h' // Token expiration time (e.g., 1 hour)
            };
            const tokenData = { data: payload };
            const token = jsonwebtoken_1.default.sign(tokenData, this.secret, options);
            return token;
        }
        catch (myE) {
            console.log('generateToken:::', myE);
        }
    }
    async decodeToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.decode(token, this.secret);
            return decoded;
        }
        catch (err) {
            return false; // Token is invalid or has expired
        }
    }
    async validateToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.secret);
            return decoded;
        }
        catch (err) {
            console.log('validateToken error:::', err);
            return false; // Token is invalid or has expired
        }
    }
}
exports.default = Token;
