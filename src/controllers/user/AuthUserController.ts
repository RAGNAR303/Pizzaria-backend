import { Request, Response } from "express"
import { AuthUserService } from '../../services/user/AuthUserServices'



class AuthUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body

        console.log({ email, password })

        const authSession = new AuthUserService()

        const session = await authSession.execute({
            email,
            password
        })

        res.json(session)
    }
}

export { AuthUserController }