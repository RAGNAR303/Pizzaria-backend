import { Request, Response } from 'express'
import { RemoveItemOrdersService } from '../../services/orders/RemoveItemOrdersService'

class RemoveItemOrdersController {
    async handle(req: Request, res: Response) {

        const { item_id } = req.query

        const removeItemOrder = new RemoveItemOrdersService()

        const remove = await removeItemOrder.execute({
            item_id: item_id as string,

        })

        res.status(200).json(remove)

    }
}

export { RemoveItemOrdersController }