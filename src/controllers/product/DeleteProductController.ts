import { Request, Response } from 'express'
import { DeleteProductService } from '../../services/product/DeleteProductService'



class DeleteProductController {

    async handle(req: Request, res: Response) {

        const product_id = req.query?.product_id as string


        const deleteProduct = new DeleteProductService()

        const delite = await deleteProduct.execute(product_id)

        res.json(delite)
    }
}

export { DeleteProductController }