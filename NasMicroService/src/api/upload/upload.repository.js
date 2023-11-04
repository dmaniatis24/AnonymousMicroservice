"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UploadRepository {
    constructor(props) {
        this.mysql = props.mysql;
        this.logger = props.logger;
        this.table = 'user';
        // this.logger.debug({ msg: 'Test Api Controller', data: this.mysql })
    }
    async verifyUserExist(username, password) { }
}
exports.default = UploadRepository;
