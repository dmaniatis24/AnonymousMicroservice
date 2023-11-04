"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UploadService {
    constructor({ repository }) {
        this.repository = repository;
        this.logger = repository.logger;
        // this.logger.debug({ msg: 'Test Api Service Inside', data: { test: 'Ok' } })
    }
    async upload(username, password) { }
}
exports.default = UploadService;
