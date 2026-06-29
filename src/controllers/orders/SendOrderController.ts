import { Request, Response } from 'express'
import { SendOrderService } from '../../services/orders/SendOrderService'

class SendOrderController {
    async handle(req: Request, res: Response) {

        const { order_id, name } = req.body


        const sendOrderUpdate = new SendOrderService()

        const send = await sendOrderUpdate.execute({
            order_id,
            name
        })


        res.status(201).json(send)
    }
}

export { SendOrderController }