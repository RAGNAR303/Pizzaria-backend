
import { Request, Response } from 'express'
import { ListOrdersDetailsService } from '../../services/orders/ListOrdersDetailsService'

class ListOrdersDetailsController {
    async handle(req: Request, res: Response) {
        const { order_id } = req.query

        const listDetailsOrder = new ListOrdersDetailsService()

        const details = await listDetailsOrder.execute({ order_id: order_id as string })

        res.status(200).json(details)
    }
}

export { ListOrdersDetailsController }