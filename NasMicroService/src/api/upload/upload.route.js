"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MySql_1 = __importDefault(require("../../infrastructure/utilities/MySql"));
const Logger_1 = __importDefault(require("../../infrastructure/utilities/Logger"));
const config_1 = __importDefault(require("../../config"));
const upload_repository_1 = __importDefault(require("./upload.repository"));
const upload_service_1 = __importDefault(require("./upload.service"));
const upload_controller_1 = __importDefault(require("./upload.controller"));
const GetEnvVar_1 = require("../../infrastructure/utilities/GetEnvVar");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = new MySql_1.default({ logger: Logger_1.default, options: config_1.default.db });
const router = (0, express_1.Router)();
const repository = new upload_repository_1.default({ mysql, logger: Logger_1.default });
const service = new upload_service_1.default({ repository });
const controller = new upload_controller_1.default({ service });
const rootFolder = (0, GetEnvVar_1.getEnvVar)('UPLOAD_PATH');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fs = require('fs');
        const folderName = rootFolder + req.query.folder;
        if (!fs.existsSync(rootFolder)) {
            fs.mkdirSync(rootFolder);
        }
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
            console.log(`Folder '${folderName}' created successfully.`);
        }
        else {
            console.log(`Folder '${folderName}' already exists.`);
        }
        cb(null, rootFolder + req.query.folder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extname = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
});
const upload = multer({ storage });
router.post('/', upload.single('file'), controller.uploadFile.bind(controller));
exports.default = router;
