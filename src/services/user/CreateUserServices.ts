import prismaClient from "../../prisma/index"
import bcrypt from 'bcryptjs'


interface createUserProps {
    name: string
    email: string
    password: string
}

class CreateUserService {
    async execute({ email, name, password }: createUserProps) {

        // Verifica de exite no banco esse usuario com mesmo email
        const userAlreadyExit = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (userAlreadyExit) {
            throw new Error('Usuario ja existe!!')
        }

        // Usa a biblioteca bcrypt para criptografar a senha
        const passwordHash = await bcrypt.hash(password, 8)


        // Cria um usuario no banco
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }

        })

        return user
    }
}

export { CreateUserService }