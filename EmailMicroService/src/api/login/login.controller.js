"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetEnvVar_1 = require("../../infrastructure/utilities/GetEnvVar");
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
            //Clear all tokens
            res.clearCookie((0, GetEnvVar_1.getEnvVar)('USER_TOKEN'));
            res.clearCookie((0, GetEnvVar_1.getEnvVar)('ADMIN_TOKEN'));
            const username = req.body.username;
            const password = req.body.password;
            const result = await this.service.login(username, password);
            console.log('result:::', result);
            if (result.token) {
                //Set the new token
                res.cookie((0, GetEnvVar_1.getEnvVar)('ADMIN_TOKEN'), result, {
                    //secure: this.environment === 'production',
                    httpOnly: true
                });
                return res.json({
                    res: {
                        login: true,
                        token: result
                    }
                });
            }
            else {
                return res.json({
                    res: {
                        login: false
                    }
                });
            }
        }
        catch (myE) {
            next(myE);
        }
    }
    async logout(req, res, next) {
        try {
            //Reset if was a simple user before
            res.clearCookie((0, GetEnvVar_1.getEnvVar)('USER_TOKEN'));
            res.clearCookie((0, GetEnvVar_1.getEnvVar)('ADMIN_TOKEN'));
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
