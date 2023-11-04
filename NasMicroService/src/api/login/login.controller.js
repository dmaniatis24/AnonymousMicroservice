"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetEnvVar_1 = require("../../infrastructure/utilities/GetEnvVar");
const Token_1 = __importDefault(require("../../infrastructure/utilities/Token"));
class LoginController {
    constructor(props) {
        this.service = props.service;
        this.logger = props.service.logger;
        this.activity = {
            entity: 'user'
        };
        // this.logger.debug({ msg: 'Test Api ApiController', data: props })
    }
    async login(req, res, next) {
        try {
            console.log('Login Asked', JSON.stringify(new Date()));
            //Clear all tokens
            const tok = new Token_1.default();
            res.clearCookie((0, GetEnvVar_1.getEnvVar)('UPLOAD_TOKEN'));
            res.cookie((0, GetEnvVar_1.getEnvVar)('UPLOAD_TOKEN'), await tok.generateToken((0, GetEnvVar_1.getEnvVar)('APP_SECRET')), {
                //secure: this.environment === 'production',
                httpOnly: true
            });
            return res.json({
                res: {
                    loginNas: true
                }
            });
        }
        catch (myE) {
            next(myE);
        }
    }
    async logout(req, res, next) {
        try {
            //Reset if was a simple user before
            res.clearCookie((0, GetEnvVar_1.getEnvVar)('UPLOAD_TOKEN'));
            return res.json({
                res: { logout: true }
            });
        }
        catch (myE) {
            next(myE);
        }
    }
}
exports.default = LoginController;
