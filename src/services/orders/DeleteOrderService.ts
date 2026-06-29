import prismaClient from "../../prisma"

interface DeleteOrderProps {
    order_id: string
}


class DeleteOrderService {
    async execute({ order_id }: DeleteOrderProps) {



        try {
            const existOrder = await prismaClient.order.findFirst({
                where: {
                    id: order_id,
                 

                }
            })

            if (!existOrder) {
                throw new Error("Pedido não existe")
            }

            await prismaClient.order.delete({
                where: {
                    id: order_id
                }

            })

            return { message: "Pedido deletado com sucesso" }

        } catch (error) {
            console.log(error)
            throw new Error("Erro em deletar o pedido")
        }


    }
}

export { DeleteOrderService }