import { DetailsUserServices } from "../../services/user/DetailsUserServices"
import { Request, Response } from 'express'



class DetailUserController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const detailUser = new DetailsUserServices()

        const detail = await detailUser.execute(user_id)


        res.json(detail)

    }
}

export { DetailUserController }