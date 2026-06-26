import prismaClient from "../../prisma"




class ListProductByCategoryService {
    async execute(category_id: string) {


        try {

            const exitsCategory = await prismaClient.category.findFirst({
                where: {
                    id: category_id
                }
            })

            if (!exitsCategory) {
                throw new Error("Categoria não existe")
            }




            const productCategory = await prismaClient.product.findMany({
                where: {
                    category_id: category_id,
                    disabled: false
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    createdAt: true,
                    description: true,
                    disabled: true
                },
                orderBy: {
                    name: "asc"
                },

            })

            return productCategory
        } catch (error) {
            console.log(error)
            throw new Error("Erro em  buscar produtos")
        }



    }
}

export { ListProductByCategoryService }