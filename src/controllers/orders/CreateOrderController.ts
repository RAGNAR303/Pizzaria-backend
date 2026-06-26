import { Request, Response } from 'express'
import { CreateOrderService } from '../../services/orders/CreateOrderService'


class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { table, name } = req.body

        const createOrders = new CreateOrderService()

        const orders = await createOrders.execute({
            table: table,
            name: name
        })

        res.status(200).json(orders)
    }
}

export { CreateOrderController }