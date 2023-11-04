"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DownloadService {
    constructor({ repository }) {
        this.repository = repository;
        this.logger = repository.logger;
        // this.logger.debug({ msg: 'Test Api Service Inside', data: { test: 'Ok' } })
    }
    async download(username, password) { }
}
exports.default = DownloadService;
