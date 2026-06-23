import { Request, Response } from "express"
import { ListCategoryService } from "../../services/category/ListCategoryService"

class ListCategoriesController {
    async handle(_: Request, res: Response) {

        const handleCategories = new ListCategoryService()

        const categories = await handleCategories.execute()


        res.status(200).json(categories)

    }
}


export { ListCategoriesController  }