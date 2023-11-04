"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportController {
    constructor(props) {
        this.service = props.service;
        this.logger = props.service.logger;
        this.activity = {
            entity: 'report'
        };
        // this.logger.debug({ msg: 'Test Api ApiController', data: props })
    }
    async post(req, res, next) {
        try {
            return res.json({
                res: await this.service.sendEmailTo(req.body)
            });
        }
        catch (myE) {
            next(myE);
        }
    }
}
exports.default = ReportController;
