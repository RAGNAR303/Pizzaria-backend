import { Response, Request } from 'express'
import { ListProductByCategoryService } from '../../services/product/ListProductCategoryService'


class ListProductByCategoryController {
    async handle(req: Request, res: Response) {

        const category_id = req.query.category_id as string

        const listProductCategory = new ListProductByCategoryService()

        const product = await listProductCategory.execute(category_id)

        res.status(201).json(product)


    }
}

export { ListProductByCategoryController }