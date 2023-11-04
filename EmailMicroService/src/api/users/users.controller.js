"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersController {
    constructor(props) {
        this.service = props.service;
        this.logger = props.service.logger;
        this.activity = {
            entity: 'users'
        };
        // this.logger.debug({ msg: 'Test Api ApiController', data: props })
    }
    async getAll(req, res, next) {
        try {
            const result = await this.service.retrieve();
            if (result.users) {
                return res.json({
                    res: result.users.res,
                    count: result.users.count
                });
            }
            else {
                next(result);
            }
        }
        catch (myE) {
            next(myE);
        }
    }
    async getInfo(req, res, next) {
        try {
            const { userId } = req.params;
            const result = await this.service.retrieveWithFilter({ _id: userId });
            if (result.users) {
                return res.json({
                    res: result.users.res,
                    count: result.users.count
                });
            }
            else {
                next(result);
            }
        }
        catch (myE) {
            next(myE);
        }
    }
    // Filtering
    async getWithFilters(req, res, next) {
        try {
            const result = await this.service.retrieveWithFilter(req.params);
            if (result.users) {
                return res.json({
                    res: result.users.res,
                    count: result.users.count
                });
            }
            else {
                next(result);
            }
        }
        catch (myE) {
            next(myE);
        }
    }
    // Search
    async getSearch(req, res, next) {
        try {
            const result = await this.service.retrieveWithFilter(req.params, false);
            if (result.users) {
                return res.json({
                    res: result.users.res,
                    count: result.users.count
                });
            }
            else {
                next(result);
            }
        }
        catch (myE) {
            next(myE);
        }
    }
    // Handlers
    async post(req, res, next) {
        try {
            const result = await this.service.insert(req.body);
            if (result.createdEntityId) {
                res.status(201).json({ res: result });
                res.locals.activity = Object.assign(Object.assign({}, this.activity), { action: 'create', data: { id: result.createdEntityId } });
            }
            else {
                next(result);
            }
        }
        catch (myE) {
            next(myE);
        }
    }
    async patch(req, res, next) {
        try {
            const { userId } = req.params;
            const result = await this.service.update({
                filters: { userId: userId },
                attrs: req.body
            });
            res.json({ res: result });
            res.locals.activity = Object.assign(Object.assign({}, this.activity), { action: 'update', data: { userId: userId } });
        }
        catch (myE) {
            next(myE);
        }
    }
    async delete(req, res, next) {
        try {
            const { userId } = req.params;
            const result = await this.service.delete({ userId: userId });
            res.json({ res: result });
            res.locals.activity = Object.assign(Object.assign({}, this.activity), { action: 'delete', data: { userId: userId } });
        }
        catch (myE) {
            next(myE);
        }
    }
    async restore(req, res, next) {
        try {
            const { userId } = req.params;
            const result = await this.service.restore({ userId: userId });
            res.json({ res: result });
            res.locals.activity = Object.assign(Object.assign({}, this.activity), { action: 'restore', data: { userId: userId } });
        }
        catch (myE) {
            next(myE);
        }
    }
}
exports.default = UsersController;
