import prismaClient from "../../prisma/index"


class CreateCategoryService {
    async execute(name: string) {

        try {
            if (!name) {
                throw new Error("Nome da categoria e obrigátoria")
            }


            const categoryAlreadyExits = await prismaClient.category.findFirst({
                where: {
                    name: name
                }
            })

            if (categoryAlreadyExits) {
                throw new Error("Categoria já existe")

            }


            const category = await prismaClient.category.create({
                data: {
                    name: name
                },
                select: {
                    id: true,
                    name: true,
                    createdAt: true
                }
            })

            return category
        } catch (error) {
            throw new Error("Categoria já existe")
        }
    }
}


export { CreateCategoryService }