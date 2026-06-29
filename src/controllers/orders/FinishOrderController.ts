import { Request, Response } from 'express'
import { FinishOrderService } from '../../services/orders/FinishOrderService'

class FinishOrderController {
    async handle(req: Request, res: Response) {

        const { order_id } = req.body


        const finishOrderUpdate = new FinishOrderService()

        const finish = await finishOrderUpdate.execute({
            order_id,
        })


        res.status(201).json(finish)
    }
}

export { FinishOrderController }