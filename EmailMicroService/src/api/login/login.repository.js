"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Encryption_1 = __importDefault(require("../../infrastructure/utilities/Encryption"));
class LoginRepository {
    constructor(props) {
        this.mysql = props.mysql;
        this.logger = props.logger;
        this.table = 'user';
        // this.logger.debug({ msg: 'Test Api Controller', data: this.mysql })
    }
    async verifyUserExist(username, password) {
        try {
            const results = await this.mysql.query(`SELECT COUNT(username) as cc FROM ${this.table} where username = '${username}'`);
            if (results.res[0].cc === 1) {
                if (await this.verifyUserPassword(username, password)) {
                    const userInfo = await this.mysql.query(`SELECT * FROM ${this.table} where username = '${username}'`);
                    return {
                        user: true,
                        password: true,
                        userInfo: userInfo.res
                    };
                }
                else {
                    return {
                        error: {
                            message: 'Password incorrect',
                            user: true,
                            password: false
                        }
                    };
                }
            }
            else {
                return {
                    error: {
                        message: 'User not found',
                        username: username,
                        password: null
                    }
                };
            }
        }
        catch (error) {
            this.logger.error({ error: this.constructor.name + ' Error', data: error });
            return {
                error: error
            };
        }
    }
    async verifyUserPassword(username, password) {
        try {
            const results = await this.mysql.query(`SELECT username,password FROM ${this.table} where username = '${username}'`);
            const passwordDb = results.res[0];
            const enc = new Encryption_1.default();
            return await enc.verifyPassword(password, passwordDb.password);
        }
        catch (error) {
            this.logger.error({ error: this.constructor.name + ' verifyUserPassword Error', data: error });
            return {
                error: error
            };
        }
    }
}
exports.default = LoginRepository;
