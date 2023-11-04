"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetEnvVar_1 = require("../../infrastructure/utilities/GetEnvVar");
class UploadController {
    constructor(props) {
        this.service = props.service;
        this.logger = props.service.logger;
        // this.logger.debug({ msg: 'Test Api ApiController', data: props })
    }
    async uploadFile(req, res, next) {
        try {
            if (req.file) {
                const response = {
                    filename: req.file.filename,
                    originalname: req.file.originalname,
                    url: `/${(0, GetEnvVar_1.getEnvVar)('UPLOAD_PATH')}/${req.query.folder}/${req.file.filename}`,
                    path: req.file.filename
                };
                return res.json({ uploaded: true, message: 'File uploaded successfully', file: response });
            }
            else {
                res.status(400).json({ message: 'File upload failed' });
            }
        }
        catch (myE) {
            next(myE);
        }
    }
}
exports.default = UploadController;
