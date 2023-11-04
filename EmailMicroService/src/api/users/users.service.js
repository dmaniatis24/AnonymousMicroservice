"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("./users.model"));
const GenerateIds_1 = __importDefault(require("../../infrastructure/utilities/GenerateIds"));
const Encryption_1 = __importDefault(require("../../infrastructure/utilities/Encryption"));
const GetEnvVar_1 = require("../../infrastructure/utilities/GetEnvVar");
class UsersService {
    constructor({ repository }) {
        this.repository = repository;
        this.logger = repository.logger;
        // this.logger.debug({ msg: 'Test Api Service Inside', data: { test: 'Ok' } })
    }
    async retrieve() {
        return await this.repository.retrieveAll();
    }
    async retrieveWithFilter(filters = {}, whereAnd = true) {
        return await this.repository.retrieveWithFilter(filters, whereAnd);
    }
    async insert(payload) {
        var _a;
        const genId = new GenerateIds_1.default({
            mysql: this.repository.mysql,
            logger: this.logger,
            table: 'user',
            id: 'userId',
            prefix: 'USR'
        });
        payload.userId = await genId.generateId();
        const enc = new Encryption_1.default();
        payload.password = await enc.hashPassword((_a = (0, GetEnvVar_1.getEnvVar)('DEFAULT_PASSWORD')) !== null && _a !== void 0 ? _a : '123456');
        const dat = (0, users_model_1.default)(payload);
        return await this.repository.insert(dat);
    }
    async update({ filters, attrs }) {
        return await this.repository.update({ filters, attrs });
    }
    async delete(filters) {
        return await this.repository.update({ filters, attrs: { deletedAt: new Date(), isDeleted: 1 } });
    }
    async restore(filters) {
        return await this.repository.restore({ filters, attrs: { deletedAt: null, isDeleted: null } });
    }
}
exports.default = UsersService;
