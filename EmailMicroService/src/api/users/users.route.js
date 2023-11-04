"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MySql_1 = __importDefault(require("../../infrastructure/utilities/MySql"));
const Logger_1 = __importDefault(require("../../infrastructure/utilities/Logger"));
const config_1 = __importDefault(require("../../config"));
const users_repository_1 = __importDefault(require("./users.repository"));
const users_service_1 = __importDefault(require("./users.service"));
const users_controller_1 = __importDefault(require("./users.controller"));
const AuthUser_1 = require("../../infrastructure/middlewares/auth/AuthUser");
const { validate } = require('../../infrastructure/middlewares/validationData/ValidationData');
const UserValidation_1 = require("../../infrastructure/middlewares/validationData/UserValidation");
const mysql = new MySql_1.default({ logger: Logger_1.default, options: config_1.default.db });
const router = (0, express_1.Router)();
const repository = new users_repository_1.default({ mysql, logger: Logger_1.default });
const service = new users_service_1.default({ repository });
const controller = new users_controller_1.default({ service });
router.get('/', AuthUser_1.authenticateMiddleware, controller.getAll.bind(controller));
router.get('/:userId', AuthUser_1.authenticateMiddleware, controller.getInfo.bind(controller));
router.get('/filtering/:filters', AuthUser_1.authenticateMiddleware, controller.getWithFilters.bind(controller));
// router.get('/search/:search', controller.getSearch.bind(controller))
//
router.post('/handler/add', AuthUser_1.authenticateMiddleware, (0, UserValidation_1.postUserValidator)(), validate, controller.post.bind(controller));
router.patch('/handler/patch/:userId', AuthUser_1.authenticateMiddleware, (0, UserValidation_1.patchUserValidator)(), validate, controller.patch.bind(controller));
router.delete('/handler/delete/:userId', AuthUser_1.authenticateMiddleware, controller.delete.bind(controller));
router.patch('/handler/restore/:userId', AuthUser_1.authenticateMiddleware, controller.restore.bind(controller));
exports.default = router;
