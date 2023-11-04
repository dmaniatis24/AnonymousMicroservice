"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalErrorHandler = (logger) => (err, req, res, next) => {
    if (!err)
        return next();
    if (err) {
        if (err instanceof TypeError) {
            return res.status(500).json({
                err: {
                    type: 'TypeError',
                    message: err.message
                }
            });
        }
        else {
            return res.status(500).json({
                err: {
                    type: 'An unexpected error occurred',
                    message: err
                }
            });
        }
    }
};
module.exports = GlobalErrorHandler;
