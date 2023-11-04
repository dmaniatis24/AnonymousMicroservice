"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DownloadRepository {
    constructor(props) {
        this.mysql = props.mysql;
        this.logger = props.logger;
        this.table = 'user';
        // this.logger.debug({ msg: 'Test Api Controller', data: this.mysql })
    }
    async download(username, password) { }
}
exports.default = DownloadRepository;
