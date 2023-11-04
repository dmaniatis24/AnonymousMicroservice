"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MySql_1 = __importDefault(require("../../infrastructure/utilities/MySql"));
const Logger_1 = __importDefault(require("../../infrastructure/utilities/Logger"));
const config_1 = __importDefault(require("../../config"));
const download_repository_1 = __importDefault(require("./download.repository"));
const download_service_1 = __importDefault(require("./download.service"));
const download_controller_1 = __importDefault(require("./download.controller"));
const mysql = new MySql_1.default({ logger: Logger_1.default, options: config_1.default.db });
const router = (0, express_1.Router)();
const repository = new download_repository_1.default({ mysql, logger: Logger_1.default });
const service = new download_service_1.default({ repository });
const controller = new download_controller_1.default({ service });
router.get('/', controller.downloadFile.bind(controller));
exports.default = router;
