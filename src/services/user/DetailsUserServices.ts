import prismaClient from "../../prisma/index";


// Service para mostrar detalhes do usuario
class DetailsUserServices {
    async execute(user_id: string) {

        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    id: user_id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            })

            if (!user) {
                throw new Error("Usuário não econtrado")
            }


            return user
        } catch (error) {
            console.log(error)
            throw new Error("Usuário não econtrado")
        }



    }
}

export { DetailsUserServices }