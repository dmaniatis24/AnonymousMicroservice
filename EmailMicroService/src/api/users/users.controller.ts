import { Request, Response } from 'express'

class UsersController {
    public service: any
    public logger: any
    private activity: string[] | any

    constructor(props: any) {
        this.service = props.service
        this.logger = props.service.logger
        this.activity = {
            entity: 'users'
        }
        // this.logger.debug({ msg: 'Test Api ApiController', data: props })
    }

    async getAll(req: Request, res: Response, next?: any): Promise<any> {
        try {
            const result = await this.service.retrieve()
            if (result.users) {
                return res.json({
                    res: result.users.res,
                    count: result.users.count
                })
            } else {
                next(result)
            }
        } catch (myE: any) {
            next(myE)
        }
    }

    async getInfo(req: Request, res: Response, next?: any): Promise<any> {
        try {
            const { userId } = req.params
            const result = await this.service.retrieveWithFilter({ _id: userId })

            if (result.users) {
                return res.json({
                    res: result.users.res,
                    count: result.users.count
                })
            } else {
                next(result)
            }
        } catch (myE: any) {
            next(myE)
        }
    }

    // Filtering

    async getWithFilters(req: Request, res: Response, next?: any): Promise<any> {
        try {
            const result = await this.service.retrieveWithFilter(req.params)
            if (result.users) {
                return res.json({
                    res: result.users.res,
                    count: result.users.count
                })
            } else {
                next(result)
            }
        } catch (myE: any) {
            next(myE)
        }
    }

    // Search

    async getSearch(req: Request, res: Response, next?: any): Promise<any> {
        try {
            const result = await this.service.retrieveWithFilter(req.params, false)
            if (result.users) {
                return res.json({
                    res: result.users.res,
                    count: result.users.count
                })
            } else {
                next(result)
            }
        } catch (myE: any) {
            next(myE)
        }
    }

    // Handlers

    async post(req: Request, res: Response, next?: any) {
        try {
            const result = await this.service.insert(req.body)
            if (result.createdEntityId) {
                res.status(201).json({ res: result })
                res.locals.activity = { ...this.activity, action: 'create', data: { id: result.createdEntityId } }
            } else {
                next(result)
            }
        } catch (myE: any) {
            next(myE)
        }
    }

    async patch(req: Request, res: Response, next?: any) {
        try {
            const { userId } = req.params
            const result = await this.service.update({
                filters: { userId: userId },
                attrs: req.body
            })

            res.json({ res: result })
            res.locals.activity = { ...this.activity, action: 'update', data: { userId: userId } }
        } catch (myE: any) {
            next(myE)
        }
    }

    async delete(req: Request, res: Response, next?: any) {
        try {
            const { userId } = req.params
            const result = await this.service.delete({ userId: userId })
            res.json({ res: result })
            res.locals.activity = { ...this.activity, action: 'delete', data: { userId: userId } }
        } catch (myE: any) {
            next(myE)
        }
    }

    async restore(req: Request, res: Response, next?: any) {
        try {
            const { userId } = req.params
            const result = await this.service.restore({ userId: userId })
            res.json({ res: result })
            res.locals.activity = { ...this.activity, action: 'restore', data: { userId: userId } }
        } catch (myE: any) {
            next(myE)
        }
    }

    // Extra for Bulk Restore
    // async restore(req: Request, res: Response, next?: any) {
    //     try {
    //         const userIds = req.body.userId
    //         this.logger.debug({ msg: 'Test', data: userIds })
    //         const result = await this.service.restore(userIds)
    //         res.json({ res: result })
    //         res.locals.activity = { ...this.activity, action: 'restore', data: { userId: userIds } }
    //     } catch (myE: any) {
    //         next(myE)
    //     }
    // }
}

export default UsersController
