import { Request, Response } from 'express'
import { DeleteOrderService } from '../../services/orders/DeleteOrderService'


class DeleteOrderController {
    async handle(req: Request, res: Response) {

        const order_id = req.query.order_id as string

        const deleteOrder = new DeleteOrderService()

        const deletar = await deleteOrder.execute({
            order_id,
        })


        res.status(201).json(deletar)
    }
}

export { DeleteOrderController }