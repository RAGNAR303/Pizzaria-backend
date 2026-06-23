import { Request, Response } from 'express'
import { ListProductService } from '../../services/product/ListProductService'

class ListProductController {
    async handle(req: Request, res: Response) {

        const disabled = req.query.disabled as string // http://localhost:3333/products?disabled=true


        const listProduct = new ListProductService()

        const products = await listProduct.execute({ disabled: disabled })

        res.status(201).json(products)

    }
}

export { ListProductController }