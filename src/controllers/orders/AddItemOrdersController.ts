
import { Request, Response } from 'express'
import { AddItemOrdersService } from '../../services/orders/AddItemOrdersService'

class AddItemOrdersController {
    async handle(req: Request, res: Response) {

        const { product_id, order_id, amount } = req.body

        const addItemOrder = new AddItemOrdersService()

        const addItem = await addItemOrder.execute({
            amount: amount,
            product_id: product_id,
            order_id: order_id
        })

        res.status(200).json(addItem)


    }
}

export { AddItemOrdersController }