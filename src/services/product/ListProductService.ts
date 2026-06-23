import prismaClient from "../../prisma/index"



interface ListProductProps {
    disabled?: string
}

class ListProductService {
    async execute({ disabled }: ListProductProps) {


        try {
            const products = await prismaClient.product.findMany({
                where: {
                    disabled: disabled === "true" ? true : false
                },
                orderBy: {
                    createdAt: 'desc'
                },
                omit: {
                    category_id: true,
                    updatedAt: true

                },
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
                ,

            })
            return products
        } catch (error) {
            console.log(error)
            throw new Error("Nao foi possivel mostrar produtos")
        }

    }
}

export { ListProductService }