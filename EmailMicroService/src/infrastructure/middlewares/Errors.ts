import { Request, Response } from 'express'

const GlobalErrorHandler = (logger: any) => (err: any, req: Request, res: Response, next?: any) => {
    if (!err) return next()
    if (err) {
        if (err instanceof TypeError) {
            return res.status(500).json({
                err: {
                    type: 'TypeError',
                    message: err.message
                }
            })
        } else {
            return res.status(500).json({
                err: {
                    type: 'An unexpected error occurred',
                    message: err
                }
            })
        }
    }
}
module.exports = GlobalErrorHandler
