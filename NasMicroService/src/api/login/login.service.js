"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = __importDefault(require("../../infrastructure/utilities/Token"));
class LoginService {
    constructor({ repository }) {
        this.repository = repository;
        this.logger = repository.logger;
        // this.logger.debug({ msg: 'Test Api Service Inside', data: { test: 'Ok' } })
    }
    async login(username, password) {
        const userExist = await this.repository.verifyUserExist(username, password);
        if (userExist.user && userExist.password) {
            const user = {
                userId: userExist.userInfo[0].userId,
                username: userExist.userInfo[0].username,
                email: userExist.userInfo[0].email,
                userType: userExist.userInfo[0].userType
            };
            const tok = new Token_1.default();
            const token = await tok.generateToken(user);
            return { login: true, token: token };
        }
        else {
            return { login: false };
        }
    }
}
exports.default = LoginService;
