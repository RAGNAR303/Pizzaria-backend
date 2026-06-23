import { compare } from "bcryptjs"
import prismaClient from "../../prisma/index"
import { sign } from 'jsonwebtoken'


interface AuthUserProps {
    email: string,
    password: string
}


class AuthUserService {

    async execute({ email, password }: AuthUserProps) {

        // Verificando se o email do usuario exite no banco
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Email ou senha e obrigatório")
        }

        // Verificando se senha do usuario e mesma

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email ou senha e obrigatório")
        }

        // GERER TOKEN JWT
        const token = sign({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET as string, {
            subject: user.id,
            expiresIn: "30d"
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        }
    }

}


export { AuthUserService }