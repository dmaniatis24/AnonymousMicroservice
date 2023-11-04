import { validationResult } from 'express-validator'

export const validate = (req: Request, res: Response, next?: any) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    // @ts-ignore
    return res.status(422).json({
        error: errors.array()
    })
}
