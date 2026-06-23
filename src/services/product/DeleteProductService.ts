import prismaClient from "../../prisma"


class DeleteProductService {
    async execute(product_id: string) {

        try {


            await prismaClient.product.update({
                where: {
                    id: product_id
                },
                data: {
                    disabled: true,
                }

            })

            return { message: "Produto deletado/Desativado com sucesso" }

        } catch (error) {
            console.log(error)
            throw new Error("Error de deletar produto")
        }

    }
}

export { DeleteProductService }